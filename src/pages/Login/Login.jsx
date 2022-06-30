import React from 'react'
import './login.css'
import { Button, Checkbox, Form, Input } from 'antd';
import logo from '../../img/1.webp' 
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Login() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <div className='login_box'>
                {/* <img src={logo} alt="" /> */}
                <div className='login_users'>
                    用户登录
                </div>

                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >


                    <Form.Item 
                        name="username"
                       
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size="large"  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                       
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password  size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码"/>
                    </Form.Item>

                    <Form.Item>
                       <Link to="/register" >
                            <div className='login_set'>
                                没有账号?立即注册
                            </div>
                            
                       </Link>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button size="large"  prefix={<UserOutlined />} type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
