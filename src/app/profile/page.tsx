"use client"

import User from "@/app/models/userModel";
import axios from "axios";
import { Button, Form, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { revalidatePath } from "next/cache";

function Profile() {
    const [disable, setDisable] = useState([
        {
            disabled: true,
        }
    ]);
    function enable() {
        setDisable(false);
    }

    let username: string = "";
    let email: string = "";

    async function getInfo() {
        if (username == "") {
            try {
                const response = await axios.get("/api/user");
                username = response.data.data.username;
                email = response.data.data.email;
            } catch (error: any) {
                message.error(error.response);
            }
        }
        console.log(username);
        console.log(email);
    };

    getInfo();

    const onModify = async (values: any) => {
        try {
            await axios.patch("/api/user", values);
            message.success("Account modificato con successo!");
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div>
            <div className="">
                <Form className='w-[500px]' layout='vertical' onFinish={onModify}>
                    <h1 className='text-2x1 font-bold'>Profilo</h1>
                    <hr />
                    <br />

                    <Form.Item name="username" label="Username" initialValue={username} >
                        <input type='text' disabled={disable}/>

                    </Form.Item>

                    <Form.Item name="email" label="Email" initialValue={email}>
                        <input type='email' disabled={disable} />
                    </Form.Item>

                    <Form.Item name="password" label="Password">
                        <input type='password' disabled={disable} />
                    </Form.Item>

                    <Button type='primary' block onClick={enable}>
                        Modifica profilo
                    </Button>

                    <Button type='primary' htmlType='submit' block disabled={disable}>
                        Conferma modifica
                    </Button>

                </Form>
            </div>
        </div>
    )
}
export default Profile