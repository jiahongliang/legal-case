import React, { useEffect } from "react";
import { useNavigate } from 'react-router';
import { useState } from "react";
import { Card, Form, Input, Button, Image } from "antd";
import { LockOutlined, UserOutlined, HolderOutlined } from '@ant-design/icons';
import { login, fetchValidateCodeRequiredFlag } from "../api/user";
import { LOGIN_USER_TOKEN } from '../util/Constants'
import Base64 from 'base-64';
import './Login.css';

const Login = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();

    let validateCodeImageUrl = '/legal-case/verify_code/generate?' + (new Date()).getTime();
    let loginActionError = '';
    const [imgUrl, setImgUrl] = useState(validateCodeImageUrl);
    const [loginError, setLoginError] = useState(loginActionError);
    const [verifyCodeRequired, setVerifyCodeRequired] = useState(false);

    useEffect(() => {
        let loginTokenString = sessionStorage.getItem(LOGIN_USER_TOKEN);
        if (loginTokenString && loginTokenString.length > 0) {
            navigate('/console');
        }
        fetchValidateCodeRequiredFlag().then(res => {
            if (res.data) { setVerifyCodeRequired(true); }
        }, err => { });
    }, [navigate]);

    const reloadValidateCode = () => {
        setImgUrl('/legal-case/verify_code/generate?' + (new Date()).getTime());
    }

    const handleLogin = () => {
        form.validateFields().then(data => {
            let loginToken = Base64.encode(JSON.stringify(data));
            login(loginToken).then((res) => {
                if (res.subCode === 0) {
                    let userDetails = res.rows[0];
                    sessionStorage.setItem(LOGIN_USER_TOKEN, JSON.stringify(userDetails));
                    navigate('/console');
                    return;
                } else {
                    setLoginError(res.subMsg);
                    reloadValidateCode();
                }
            }, (error) => {
                setLoginError(error.message);
                reloadValidateCode();
            });
        });
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <Card size="small"
                    bordered={true}
                    hoverable
                    title="欢迎登录"
                    headStyle={{ 'fontWeight': '600' }}>
                    <Form form={form} className="login-form">
                        <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input addonBefore={<UserOutlined />} maxLength={20} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password addonBefore={<LockOutlined />} maxLength={20} placeholder="请输入密码" />
                        </Form.Item>
                        {
                            verifyCodeRequired ?
                                <Form.Item name="verifyCode" rules={[{ required: true, message: '请输入验证码' }]}>
                                    <Input addonBefore={<HolderOutlined />} maxLength={4}
                                        addonAfter={<Image width={80} src={imgUrl} onClick={reloadValidateCode} onError={reloadValidateCode} preview={false} />}
                                        placeholder="请输入验证码" />
                                </Form.Item>
                                : <></>
                        }
                            <Button type="primary" block onClick={handleLogin}> 登录 </Button>
                            <Button block onClick={() => {navigate('/register');}} className="register-button"> 注册 </Button>
                        <div className="ant-form-item-explain-error">{loginError}</div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
export default Login;
