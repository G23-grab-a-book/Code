'use client'
import { RequiredField } from "@/app/helpers/validation";
import {Button, Form, Input, message, Select} from "antd"
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
            const id = res.data.data._id;
            console.log(res.data.data._id);
            router.push("/annunci/"+id);
        } catch (error: any) {
            message.error("Please log in");
            message.error(error.response.data.message);

        }
    };

    return (
        <div className="forms">
                <Form className='w-[500px]-m-auto' layout='vertical' onFinish={onAddAnnuncio}>
                    <h1 className='text-2x1 font-bold'>Add Book</h1>
                    <hr />
                    <br />

                    <Form.Item name="title" label="Title"
                               rules={RequiredField('Please insert the title')}
                               initialValue={''}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="author" label="Author"
                               rules={RequiredField('Please insert the author')}
                               initialValue={''}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="category" label="Category"
                               rules={RequiredField('Please choose the category')}
                               initialValue={'other'}>
                        <Select>
                            <Select.Option value="university">University</Select.Option>
                            <Select.Option value="action">Action</Select.Option>
                            <Select.Option value="horror">Horror</Select.Option>
                            <Select.Option value="non-fiction">Non-Fiction</Select.Option>
                            <Select.Option value="comic">Comic</Select.Option>
                            <Select.Option value="fantasy">Fantasy</Select.Option>
                            <Select.Option value="science">Science</Select.Option>
                            <Select.Option value="mystery">Mystery</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="ISBN" label="ISBN"
                               rules={RequiredField('Please insert the ISBN')}
                               initialValue={''}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="price" label="Price"
                               rules={RequiredField('Please insert the price')}
                               initialValue={''}>
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item name="condition" label="Condition"
                               rules={RequiredField('Please choose the condition')}
                               initialValue={'new'}>
                        <Select>
                            <Select.Option value="new">New</Select.Option>
                            <Select.Option value="good">Good</Select.Option>
                            <Select.Option value="used">Used</Select.Option>
                            <Select.Option value="damaged">Damaged</Select.Option>
                        </Select>
                    </Form.Item>

                    <Button type='primary' htmlType='submit' block>
                        Post the ad
                    </Button>
                </Form>
            <br/>
        </div>

    )
}
export default AddAnnuncio