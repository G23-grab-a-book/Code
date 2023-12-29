"use client"
import { RequiredField } from "@/app/helpers/validation";
import {Button, Form, Input, message} from "antd"
import axios from "axios";
import Link from "next/link"
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


interface userType {
    username: string;
    password: string;
}
function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false); 
    const onLogin = async (values: userType) => {
        try {
            setLoading(true);
            const res = await axios.post("/api/auth/login", values);
            // console.log(res)
            if(res.data.status == 401){
                setLoading(false);
                message.error(res.data.message);
            }
            else{
                setLoading(false);
                message.success("Benvenuto!");
                // After successful login
                const search = searchParams.get('redirect');
                if (search !== null) {
                    router.push(search);
                    return;
                }
                router.refresh();
                router.push("/profile");
                router.refresh();
            }
        } catch (error: any) {
            setLoading(false);
            message.error(error.response.data.message);
        }
    };
    return (
        <div className="text">
            <div className="forms">
                <Form className='w-[500px]-m-auto' layout='vertical' onFinish={onLogin} >
                    <h1 className='text-2x1 font-bold'>Accedi</h1>
                    <hr />
                    <br />
                    <Form.Item name="username" label="Username"
                        rules={RequiredField('Please insert the username')}
                        initialValue={''}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="password" label="password"
                        rules={RequiredField('Please insert the password')}
                        initialValue={''}>
                        <Input type='password' />
                    </Form.Item>
                    <Button type='primary' style={{marginLeft:"0.25em", marginBottom:"5px"}} htmlType='submit' block loading={loading}>
                        Login
                    </Button>


                </Form>
                <br />
                <Link href="/auth/register" className='text-black'>
                        Non hai ancora un account? Registrati.
                    </Link>
            </div>
        </div>
        )
    }
export default Login