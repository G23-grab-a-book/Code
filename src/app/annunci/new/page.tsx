'use client'
import { RequiredField } from "@/app/helpers/validation";
import {Button, Form, message, Select} from "antd"
import axios from "axios";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React from 'react'

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
    const onAddAnnuncio = async (values: annuncioType) => {
        console.log(values);
        try {
            const res = await axios.post("/api/annunci/new", values);
            message.success("Successfully added post");
            console.log(res);
            const id = res.data.data._id;
            console.log(res.data.data._id);
            router.push("/annunci/"+id);
        } catch (error: any) {
            message.error("Please log in");
            message.error(error.response.data.message);

        }
    };

    return (
        <div>
            <div className="">
                <Form className='w-[500px]' layout='vertical' onFinish={onAddAnnuncio}>
                    <h1 className='text-2x1 font-bold'>Add Book</h1>
                    <hr />
                    <br />

                    <Form.Item name="title" label="Title"
                               rules={RequiredField('Please insert the title')}
                               initialValue={''}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="author" label="Author"
                               rules={RequiredField('Please insert the author')}
                               initialValue={''}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="category" label="Category"
                               rules={RequiredField('Please choose the category')}
                               initialValue={'other'}>
                        <select>
                            <option value="university">University</option>
                            <option value="action">Action</option>
                            <option value="horror">Horror</option>
                            <option value="non-fiction">Non-Fiction</option>
                            <option value="comic">Comic</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="science">Science</option>
                            <option value="mystery">Mystery</option>
                            <option value="other">Other</option>
                        </select>
                    </Form.Item>
                    <Form.Item name="ISBN" label="ISBN"
                               rules={RequiredField('Please insert the ISBN')}
                               initialValue={''}>
                        <input type='text' />
                    </Form.Item>
                    <Form.Item name="price" label="Price"
                               rules={RequiredField('Please insert the price')}
                               initialValue={''}>
                        <input type='number' />
                    </Form.Item>
                    <Form.Item name="condition" label="Condition"
                               rules={RequiredField('Please choose the condition')}
                               initialValue={'new'}>
                        <select>
                            <option value="new">New</option>
                            <option value="good">Good</option>
                            <option value="used">Used</option>
                            <option value="damaged">Damaged</option>
                        </select>
                    </Form.Item>

                    <Button type='primary' htmlType='submit' block>
                        Post the ad
                    </Button>
                </Form>
                <Link href={"/"}>Back to home</Link>
            </div>
        </div>

    )
}
export default AddAnnuncio