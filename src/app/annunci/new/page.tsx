'use client'
import { RequiredField } from "@/app/helpers/validation";
import {Button, Form, Input, message, Select} from "antd"
import axios from "axios";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface annuncioType {
    title: string;
    author: string;
    category: string;
    ISBN: string;
    price: number;
    condition: string;
    seller: string;
}
function AddAnnuncio () {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const onAddAnnuncio = async (values: annuncioType) => {
        console.log(values);
        try {
            setLoading(true);
            const res = await axios.post("/api/annunci/new", values);
            message.success("Annuncio creato con successo!");
            const id = res.data.data._id;
            console.log(res.data.data._id);
            setLoading(false);
            router.push("/annunci/"+id);
        } catch (error: any) {
            setLoading(false);
            message.error("Please log in");
            message.error(error.response.data.message);

        }
    };

    return (
        <div className="forms">
                <Form className='w-[500px]-m-auto' layout='vertical' onFinish={onAddAnnuncio}>
                    <h1 className='text-2x1 font-bold'>Aggiungi un annuncio </h1>
                    <hr />
                    <br />

                    <Form.Item name="title" label="Titolo"
                               rules={RequiredField('Inserisci un titolo')}
                               initialValue={''}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="author" label="Autore"
                               rules={RequiredField('Inserisci un autore')}
                               initialValue={''}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="category" label="Categoria"
                               rules={RequiredField('Seleziona una categoria')}
                               initialValue={'other'}>
                        <Select>
                            <Select.Option value="university">Università</Select.Option>
                            <Select.Option value="action">Azione</Select.Option>
                            <Select.Option value="horror">Horror</Select.Option>
                            <Select.Option value="non-fiction">Saggi</Select.Option>
                            <Select.Option value="comic">Fumetti</Select.Option>
                            <Select.Option value="fantasy">Fantasy</Select.Option>
                            <Select.Option value="science">Scienza</Select.Option>
                            <Select.Option value="mystery">Mistero</Select.Option>
                            <Select.Option value="other">Altro</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="ISBN" label="ISBN"
                               rules={RequiredField('Inserisci un ISBN')}
                               initialValue={''}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="price" label="Prezzo"
                               rules={RequiredField('Seleziona un prezzo')}
                               initialValue={''}>
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item name="condition" label="Condizione"
                               rules={RequiredField('Seleziona una condizione')}
                               initialValue={'new'}>
                        <Select>
                            <Select.Option value="new">Nuovo</Select.Option>
                            <Select.Option value="good">Buono</Select.Option>
                            <Select.Option value="used">Usato</Select.Option>
                            <Select.Option value="damaged">Danneggiato</Select.Option>
                        </Select>
                    </Form.Item>

                    <Button type='primary' htmlType='submit' block loading={loading}>
                        Inserisci l'annuncio
                    </Button>
                </Form>
            <br/>
        </div>

    )
}
export default AddAnnuncio