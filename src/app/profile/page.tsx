"use client";
import { Button, Form, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RequiredField } from "../helpers/validation";

// function Profile({ params, }: { params: { id: string; }; }) {
function Profile() {
    const [disable, setDisable] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    
    function enable() {
        setDisable(false);
    }

    useEffect(() => {
        async function getInfo() {
            try {
                // const response = await axios.get(`/api/user/?user=${params.id}`);
                const response = await axios.get(`/api/user/?user=1`);
                setUsername(response.data.data.username);
                setEmail(response.data.data.email);
                setLoading(false); // Segnala che il caricamento è completato
            } catch (error) {
                message.error((error as any).response?.data?.message || "Errore nel recupero dei dati");
                setLoading(false); // Segnala che il caricamento è completato anche in caso di errore
            }
        }

        getInfo();
    }, []);

    const onModify = async (values: any) => {
        try {
            await axios.patch("/api/user", values);
            message.success("Account modificato con successo!");
        } catch (error) {
            message.error((error as any).response?.data?.message || "Si è verificato un errore durante la modifica dell'account");
        }
    };

    if (loading) {
        // centra l'indicatore di caricamento
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="">
                <Form className='w-[500px]' layout='vertical' onFinish={onModify}>
                    <h1 className='text-2x1 font-bold'>Profilo</h1>
                    <hr />
                    <br />

                    <Form.Item name="username" label="Username" initialValue={username} rules={RequiredField('Please insert the username')} >
                        <input type='text' disabled={disable}/>

                    </Form.Item>

                    <Form.Item name="email" label="Email" initialValue={email} rules={RequiredField('Please insert the email')}>
                        <input type='email' disabled={disable} />
                    </Form.Item>

                    <Form.Item name="password" label="Password" initialValue={''}>
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
    );
}

export default Profile;
