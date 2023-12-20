'use client'
import { RequiredField } from "@/app/helpers/validation";
import { Button, Form } from "antd"
import Link from "next/link"

interface userType {
    username: string;
    password: string;
}
function Login () {
    
    const onLogin = (values: userType) => {
        console.log(values);
    }
    return (
        <div>
            <div className="">
                <Form className='w-[500px]' layout='vertical' >
                    <h1 className='text-2x1 font-bold'>Login</h1>
                    <hr />
                    <br />
                    <Form.Item name="username" label="Username"
                            rules={RequiredField('Please insert the username')}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="password" label="password"
                            rules={RequiredField('Please insert the password')}>
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