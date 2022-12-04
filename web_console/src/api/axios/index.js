import axios from "axios";
import {message} from 'antd';
import {createBrowserHistory} from 'history';
import {LOGIN_USER_TOKEN} from '../../util/Constants'

axios.defaults.timeout = 60000;
axios.defaults.baseURL = '/legal-case';

export let serviceJson = axios.create({});

export let service = axios.create({
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    transformRequest: [
        function(data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0, ret.lastIndexOf('&'));
            return ret;
        }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});

export let serviceUpload = axios.create({
    headers: {
        'content-type': 'multipart/form-data'
    },
});

export let http = axios.create({
    headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
});

function interceptors(service) {
    const browserHistory = createBrowserHistory();
    service.interceptors.request.use(
        (config) => {
            config.headers.token = 'token';
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    service.interceptors.response.use(
        (response) => {
            const dataAxios = response;
            const {code} = dataAxios.data;

            if(!code) {
                return dataAxios;
            }

            switch (code) {
                case 10000:
                    return dataAxios.data;
                default:
                    errorCreate(`${dataAxios.data.msg}`)
            }
        },
        (error) => {
            let showLogin = false;
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.message = '请求错误'
                        break
                    case 401:
                        error.message = '未登录或登录超时，请重新登录'
                        showLogin = true;
                        break
                    case 403:
                        error.message = '拒绝访问'
                        break
                    case 404:
                        error.message = `请求地址出错: ${error.response.config.url}`
                        break
                    case 408:
                        error.message = '请求超时'
                        break
                    case 500:
                        error.message = '服务器内部错误'
                        break
                    case 501:
                        error.message = '服务未实现'
                        break
                    case 502:
                        error.message = '网关错误'
                        break
                    case 503:
                        error.message = '服务不可用'
                        break
                    case 504:
                        error.message = '网关超时'
                        break
                    case 505:
                        error.message = 'HTTP版本不受支持'
                        break
                    default:
                        break
                }
            }
            errorLog(error);
            if(showLogin) {
                setTimeout(() => {
                    sessionStorage.removeItem(LOGIN_USER_TOKEN);
                    browserHistory.push('/');
                    browserHistory.go();
                },1000)
            }
            return Promise.reject(error);
        }
    );
}

function errorCreate(msg) {
    const err = new Error(msg);
    errorLog(err);
}

function errorLog(err) {
    message.error(err.message);
}

interceptors(service);
interceptors(serviceJson);
interceptors(serviceUpload);
interceptors(http);