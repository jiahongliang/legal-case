import {useState} from 'react';
import { Card, Button, Form, Result, Input, Select } from 'antd';
import {registerUser} from '../../../api/user';

const {Option} = Select;
const {TextArea} = Input;
 
const UserRegister = () => {
    const [form] = Form.useForm();
    const [saveResult,setSaveResult] = useState({
        code: null,
        message: null
    })

    const closeResult = () => {
        form.resetFields();
        setSaveResult({
            code: null,
            message: null
        });
    }

    const saveForm = (formData) => {
        let params = {
            entity: formData
        }
        registerUser(params).then(res => {
            // console.log(res);
            if(res.subCode === 0) {
                setSaveResult({code:"success",message:res.subMsg});
            } else {
                setSaveResult({code:"error",message:res.subMsg});
            }
        });
    }

    return (
        <>
        {
            saveResult.code == null ? (
                <Card
                    title="用户注册"
                    style={{
                        width: "600px",
                        margin: "20px auto 0 auto"
                    }}
                >
                    <Form form={form} layout="vertical" onFinish={saveForm}>
                        <Form.Item name="name" label="姓名" rules={[{ required: true, message: '姓名必须输入' }]}>
                            <Input placeholder="请输入姓名" maxLength={50}/>
                        </Form.Item>
                        <Form.Item name="gender" label="性别" rules={[{ required: true, message: '性别必须选择' }]}>
                            <Select>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="deptName" label="单位名称" rules={[{ required: true, message: '单位名称必须输入' }]}>
                            <Input placeholder="请输入单位名称" maxLength={50}/>
                        </Form.Item>
                        <Form.Item name="mobile" label="手机号码" rules={[{ required: true, message: '手机号码必须输入' }]}>
                            <Input placeholder="请输入手机号码" maxLength={20}/>
                        </Form.Item>
                        <Form.Item name="memo" label="说明">
                                <TextArea rows={4} />
                            </Form.Item>
                        <Form.Item wrapperCol= {{ offset: 0, span: 24 }} style={{textAlign: "center"}}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button> 
                        </Form.Item>
                    </Form>
                </Card>
            ) : (
                <Result status={saveResult.code} 
                    title={saveResult.message} 
                    extra={[<Button key={"btn_" + saveResult.code} 
                    onClick={closeResult}>确定</Button>]}>
                </Result>
            )
        }
            
        </>
    );
}

export default UserRegister;