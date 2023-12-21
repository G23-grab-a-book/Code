'use client'
import { RequiredField } from "@/app/helpers/validation";
import { Button, Form, message } from "antd"
import axios from "axios";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React from "react";

interface userType {
    username: string;
    password: string;
}
function Login() {
    const router = useRouter();
    const onLogin = async (values: userType) => {
        try {
            await axios.post("/api/auth/login", values);
            message.success("Login successful");
            router.push("/");
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };
    return (
        <div>
            <div className="">
                <Form className='w-[500px]' layout='vertical' onFinish={onLogin} >
                    <h1 className='text-2x1 font-bold'>Login</h1>
                    <hr />
                    <br />
                    <Form.Item name="username" label="Username"
                        rules={RequiredField('Please insert the username')}
                        initialValue={''}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="password" label="password"
                        rules={RequiredField('Please insert the password')}
                        initialValue={''}>
                        <input type='password' />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Login
                    </Button>

                    <Link href="/auth/register" className='text-black'>
                        Don't you have an account? Register.
                    </Link>
                </Form>
            </div>
        </div>
        )
    }
export default Login