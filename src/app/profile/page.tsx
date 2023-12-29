"use client";
import { Button, Form, Input, message, Popconfirm, Spin } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RequiredField } from "../helpers/validation";


type Announcement = { // smaller version of the announcement class
    id: string;
    title: string;
    author: string;
    seller: string;
};


// function Profile({ params, }: { params: { id: string; }; }) {
function Profile() {
    const [disable, setDisable] = useState(true);
    const [sending, setSendng] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    function enable() {
        setDisable(false);
    }
    function notEnable() {
        console.log("HE");
        setDisable(true);
    }

    const getInfo = async () => {
        try {
            // const response = await axios.get(`/api/user/?user=${params.id}`);
            // const theme = getCookies();
            // console.log(theme);
            const response = await axios.get(`/api/user/`);
            setUsername(response.data.data.username);
            setEmail(response.data.data.email);
            const annunci_response = await axios.get("/api/annunci/ricerca", { params: { search: "user" } });
            let annunci: Announcement[] = [];
            for (let i = 0; i < annunci_response.data.data.length; i++) {
                let annuncio: Announcement = {
                    id: annunci_response.data.data[i]._id,
                    title: annunci_response.data.data[i].title,
                    author: annunci_response.data.data[i].author,
                    seller: annunci_response.data.data[i].seller,
                };
                annunci.push(annuncio);
                console.log(annuncio);
            }
            setAnnouncements(annunci);
            setLoading(false); // Segnala che il caricamento è completato
        } catch (error) {
            console.log(error); 
            message.error((error as any).response?.data?.message || "Errore nel recupero dei dati");
            setLoading(false); // Segnala che il caricamento è completato anche in caso di errore
        }
    };

    useEffect(() => {
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

    const adDelete = async (values: Announcement) => {
        try {
            await axios.delete(`/api/annunci/${values.id}`);
            message.success("Annuncio eliminato con successo!");
            getInfo();

        } catch (error) {
            message.error((error as any).response?.data?.message || "Si è verificato un errore durante l'eliminazione dell'annuncio'");
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

    /*  FORM MODIFICA PROFILO
    <div className="ml-10 mt-10 ">
                    <Form className='w-[500px]' layout='vertical' onFinish={onModify}>
                        <h1 className='text-2x1 font-bold'>Profilo</h1>
                        <hr />
                        <br />

                        <Form.Item name="username" label="Username" initialValue={username} rules={RequiredField("Inserisci l'username")}>
                            <Input type='text' disabled={disable} />

                        </Form.Item>

                    <Form.Item name="email" label="Email" initialValue={email} rules={RequiredField("Inserisci l'email")}>
                        <Input type='email' disabled={disable} />
                    </Form.Item>

                    <Form.Item name="password" label="Password" initialValue={''}>
                        <Input type='password' disabled={disable} />
                    </Form.Item>

                        <Button type='primary' block onClick={enable} disabled={!disable}>
                            Modifica profilo
                        </Button>

                        <Button type='primary' htmlType='submit' block disabled={disable} loading={sending}>
                            Conferma modifica
                        </Button>

                    </Form>
                </div>
    */

    /* LISTA PROPRI ANNUNCI
        <div className="ml-10 flex flex-col justify-center items-center h-screen">
                    <Button type='primary' shape="default" size="large" href="/annunci/new">Aggiungi un nuovo annuncio</Button>
                    <h1 className="mt-6">I tuoi annunci</h1>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {announcements.map((announcement) => (
                            <li key={announcement.id} style={{ marginTop: '1em', marginBottom: '1em', border: '1px solid #ccc', padding: '1em' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h2 style={{ marginRight: '2em' }}>{announcement.title}</h2>
                                    <div style={{ flex: '1', textAlign: 'center' }}>
                                        <p style={{ color: 'grey' }}> di {announcement.author}</p>
                                    </div>
                                    <div style={{ textAlign: 'right', marginLeft: '4em' }}>
                                        <Button shape='round' type='primary' href={`/annunci/${announcement.id}`}>Apri Annuncio</Button>
                                        <Popconfirm
                                        title="Sei sicuro di voler eliminare questo annuncio?"
                                        okText="Si"
                                        cancelText="No"
                                        onConfirm={() => adDelete(announcement)}>
                                            <Button shape='round' style={{marginLeft:"1em"}} type='primary' icon={<DeleteOutlined />} danger>Elimina</Button>
                                        </Popconfirm>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
     */

    return (
        <div className="text">
            <h1 className="mt-3 ml-5">Ciao {username},</h1>
            <div className="flex justify-start mt-10">
                <div className="grid">
                    <div className="grid-item-left">
                        <div className="m-10">
                            <Form className='w-auto' layout='vertical' onFinish={onModify}>
                                <h1 className='text-2x1 font-bold'>Profilo</h1>
                                <hr/>
                                <br/>

                                <Form.Item name="username" label="Username" initialValue={username}
                                           rules={RequiredField("Inserisci l'username")}>
                                    <Input type='text' disabled={disable}/>

                                </Form.Item>

                                <Form.Item name="email" label="Email" initialValue={email}
                                           rules={RequiredField("Inserisci l'email")}>
                                    <Input type='email' disabled={disable}/>
                                </Form.Item>

                                <Form.Item name="password" label="Password" initialValue={''}>
                                    <Input type='password' disabled={disable}/>
                                </Form.Item>

                                <Button type='primary' style={{marginLeft:"0.25em", marginBottom:"5px"}} block onClick={enable} disabled={!disable}>
                                    Modifica profilo
                                </Button>

                                <Button type='primary' style={{marginLeft:"0.25em"}} htmlType='submit' block disabled={disable} loading={sending}>
                                    Conferma modifica
                                </Button>

                            </Form>
                        </div>
                    </div>
                    <div className="grid-item-right">
                        <div className="m-10">
                            <h1 className="text-2x1 font-bold">I tuoi annunci</h1>
                            <hr/>
                            <br/>
                            <ul style={{listStyle: 'none', padding: 0}}>
                                {announcements.map((announcement) => (
                                    <li key={announcement.id} style={{
                                        marginTop: '1em',
                                        marginBottom: '1em',
                                        border: '1px solid #ccc',
                                        padding: '1em'
                                    }}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <h2 style={{marginRight: '2em'}}>{announcement.title}</h2>
                                            <div style={{flex: '1', textAlign: 'center'}}>
                                                <p style={{color: 'grey'}}> di {announcement.author}</p>
                                            </div>
                                            <div style={{textAlign: 'right', marginLeft: '4em'}}>
                                                <Button shape='round' type='primary'
                                                        href={`/annunci/${announcement.id}`}>Apri Annuncio</Button>
                                                <Popconfirm
                                                    title="Sei sicuro di voler eliminare questo annuncio?"
                                                    okText="Si"
                                                    cancelText="No"
                                                    onConfirm={() => adDelete(announcement)}>
                                                    <Button shape='round' style={{marginLeft: "1em"}} type='primary'
                                                            icon={<DeleteOutlined/>} danger>Elimina</Button>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button type='primary' shape="default" size="large" href="/annunci/new">Aggiungi un nuovo
                                annuncio</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
