'use client'
import { RequiredField } from "@/app/helpers/validation";
import { Button, Form, message } from "antd"
import axios from "axios";
import Link from "next/link"
import React from 'react'

interface userType {
    username: string;
    email: string;
    password: string;
} // cambiare con lo schema mongoose

function Register () {
    
    const onRegister = async (values: userType) => {
        try {
            await axios.post("/api/auth/register", values);
            message.success("Registration successful, please login to continue");
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };
    return (
        <div>
            <div className="">
                <Form className='w-[500px]' layout='vertical' >
                    <h1 className='text-2x1 font-bold'>Register</h1>
                    <hr />
                    <br />
                    <Form.Item name="username" label="Username"
                            rules={RequiredField('Please insert the username')}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="email" label="Email"
                            rules={RequiredField('Please insert the email')}>
                        <input type='email' />
                    </Form.Item>
                    <Form.Item name="password" label="password"
                            rules={RequiredField('Please insert the password')}>
                        <input type='password' />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Register
                    </Button>

                    <Link href="/auth/login" className='text-black'>
                        Already have an account? Login.
                    </Link>
                </Form>
            </div>
        </div>
        
    )
}
export default Register