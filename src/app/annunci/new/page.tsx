'use client'
import { RequiredField } from "@/app/helpers/validation";
import {Button, Form, message, Select} from "antd"
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
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="author" label="Autore"
                               rules={RequiredField('Inserisci un autore')}
                               initialValue={''}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="category" label="Categoria"
                               rules={RequiredField('Seleziona una categoria')}
                               initialValue={'other'}>
                        <Select>
                            <option value="university">Università</option>
                            <option value="action">Azione</option>
                            <option value="horror">Horror</option>
                            <option value="non-fiction">Saggi</option>
                            <option value="comic">Fumetti</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="science">Scienza</option>
                            <option value="mystery">Mistero</option>
                            <option value="other">Altro</option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="ISBN" label="ISBN"
                               rules={RequiredField('Inserisci un ISBN')}
                               initialValue={''}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="price" label="Prezzo"
                               rules={RequiredField('Seleziona un prezzo')}
                               initialValue={''}>
                        <input type='number' />
                    </Form.Item>
                    <Form.Item name="condition" label="Condizione"
                               rules={RequiredField('Seleziona una condizione')}
                               initialValue={'new'}>
                        <Select>
                            <option value="new">Nuovo</option>
                            <option value="good">Buono</option>
                            <option value="used">Usato</option>
                            <option value="damaged">Danneggiato</option>
                        </Select>
                    </Form.Item>

                    <Button type='primary' htmlType='submit' block loading={loading}>
                        Inserisci l'annuncio
                    </Button>
                </Form>
                <br />
                <Link className='text-black' href={"/"}>Torna alla home</Link>
        </div>

    )
}
export default AddAnnuncio