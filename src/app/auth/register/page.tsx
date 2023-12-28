'use client'
import { RequiredField } from "@/app/helpers/validation";
import { Button, Form, message } from "antd"
import axios from "axios";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface userType {
    username: string;
    email: string;
    password: string;
}
function Register () {
    const router = useRouter();
    const [loading, setLoading] = useState(false); 
    const onRegister = async (values: userType) => {
        console.log(values);
        try {
            setLoading(true);
            await axios.post("/api/auth/register", values);
            message.success("Registrazione avvenuta con successo, benvenuto!");
            setLoading(false);
            router.push("/auth/login");
        } catch (error: any) {
            setLoading(false);
            message.error(error.response.data.message);
        }
    };

    return (
        <div>
            <div className="forms">
                <Form className='w-[500px]-m-auto' layout='vertical' onFinish={onRegister}>
                    <h1 className='text-2x1 font-bold'>Registrati</h1>
                    <hr />
                    <br />
                    
                     <Form.Item name="username" label="Username"
                            rules={RequiredField('Please insert the username')}
                            initialValue={''}>
                        <input type='text' />

                    </Form.Item>
                    <Form.Item name="email" label="Email"
                            rules={RequiredField('Please insert the email')}
                            initialValue={''}>
                        <input type='email' />
                    </Form.Item>
                    <Form.Item name="password" label="Password"
                            rules={RequiredField('Please insert the password')}
                            initialValue={''}>
                        <input type='password' />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' block loading={loading}>
                        Register
                    </Button>

                </Form>
                <br />
                <Link href="/auth/login" className='text-black'>
                        Hai già un account? Accedi.
                    </Link>
            </div>
        </div>
        
    )
}
export default Register