import { service, serviceJson } from "./axios";

export const login = (loginToken) => {
    const data = { loginToken };
    return service({
        url: '/login',
        data,
        method: 'post',
    });
}

export const fetchValidateCodeRequiredFlag = () => {
    return service({
        url: '/verify_code/required_flag',
        method: 'get'
    })
}

export const fetchValidateCodeImage = () => {
    return service({
        url: '/verify_code/generate',
        method: 'get',
        responseType: "blob"
    })
}

export const logout = () => {
    return service({
        url: '/logout',
        method: 'get'
    })
}

export const updatePassword = (params) => {
    const data = { params };
    return service({
        url: '/user/update-password',
        data,
        method: 'post',
    });
}

export const userList = (data) => {
    return serviceJson({
        url: '/user/list',
        data,
        method: 'post',
    });
}

export const userAction = (data) => {
    return serviceJson({
        url: '/user/action',
        data,
        method: 'post',
    });
}

export const saveUser = (data) => {
    return serviceJson({
        url: '/user/update',
        data,
        method: 'post',
    });
}

export const roleList = () => {
    return serviceJson({
        url: '/role/list',
        method: 'get',
    });
}

export const registerUser = (data) => {
    return serviceJson({
        url: '/user/register',
        data,
        method: 'post',
    });
}

export const resetPassword = (data) => {
    return serviceJson({
        url: '/user/reset-password',
        data,
        method: 'post',
    });
}

export const menuOrderList = () => {
    return serviceJson({
        url: '/menu-order/list',
        method: 'get',
    });
}

export const saveMenuOrder = (data) => {
    return serviceJson({
        url: '/menu-order/save',
        data,
        method: 'post',
    });
}

export const loginLogList = (data) => {
    return serviceJson({
        url: '/login-log/list',
        data,
        method: 'post',
    });
}