"use client";
import { Button, Form, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RequiredField } from "../helpers/validation";

// function Profile({ params, }: { params: { id: string; }; }) {
function Profile() {
    const [disable, setDisable] = useState(true);
    const [sending, setSendng] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true); // Stato per il caricamento

    function enable() {
        setDisable(false);
    }
    function notEnable() {
        console.log("HE");
        setDisable(true);
    }

    useEffect(() => {
        async function getInfo() {
            try {
                // const response = await axios.get(`/api/user/?user=${params.id}`);
                // const theme = getCookies();
                // console.log(theme);
                const response = await axios.get(`/api/user/`);
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
            setSendng(true);
            await axios.patch("/api/user", values);
            setSendng(false);
            notEnable();
            message.success("Account modificato con successo!");
        } catch (error) {
            setSendng(false);
            notEnable();
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
        <><h1 className="mt-3 ml-5">Ciao {username},</h1>
        <div className="flex justify-start h-screen mt-3">
            <div className="ml-10 ">
                <Form className='w-[500px]' layout='vertical' onFinish={onModify}>
                    <h1 className='text-2x1 font-bold'>Profilo</h1>
                    <hr />
                    <br />

                    <Form.Item name="username" label="Username" initialValue={username} rules={RequiredField('Please insert the username')}>
                        <input type='text' disabled={disable} />

                    </Form.Item>

                    <Form.Item name="email" label="Email" initialValue={email} rules={RequiredField('Please insert the email')}>
                        <input type='email' disabled={disable} />
                    </Form.Item>

                    <Form.Item name="password" label="Password" initialValue={''}>
                        <input type='password' disabled={disable} />
                    </Form.Item>

                    <Button type='primary' block onClick={enable} disabled={!disable}>
                        Modifica profilo
                    </Button>

                    <Button type='primary' htmlType='submit' block disabled={disable} loading={sending}>
                        Conferma modifica
                    </Button>

                </Form>
            </div>
            <div className="ml-64 flex justify-center items-center h-screen">
                <Button type='primary' shape="default" size="large" href="/annunci/new">Aggiungi un nuovo annuncio</Button>
            </div>
        </div></>
    );
}

export default Profile;
