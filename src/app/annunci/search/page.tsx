"use client"
import { message, Input, Spin } from 'antd';
import axios from 'axios';
import { set } from 'mongoose';
import router, { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Announcement = {
    id: string;
    image: string;
    title: string;
    author: string;
};

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const onSearch = async (value: string) => {
        setIsLoading(true);
        try {
            if (value == null) {
                value = search as string;
            }
            if (search === null || search === undefined || search === "" || value === null || value === undefined || value === "") {
                router.push("/");
                return;
            }
            // change all the + with spaces
            value = value.replace(/\+/g, " ");
            // const response = await axios.get('/api/annunci/ricerca', { search: value });
            const response = await axios.get("/api/annunci/ricerca", { params: { search: value } });
            let annunci: Announcement[] = [];
            for (let i = 0; i < response.data.data.length; i++) {
                let annuncio: Announcement = {
                    id: response.data.data[i]._id,
                    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6VrI1fe7BXBT_dNPg3BBXQHaEo%26pid%3DApi&f=1&ipt=907643bde8975732ef04e26c798b568ac67eb3fa882a55bcae7885182a6f9a95&ipo=images",
                    title: response.data.data[i].title,
                    author: response.data.data[i].author
                };
                annunci.push(annuncio);
            }
            setAnnouncements(annunci);
            setIsLoading(false);
            console.log(announcements);
        } catch (error) {
            setIsLoading(false);
            message.error((error as any).response.data.message);
        }
    };

    useEffect(() => {
        onSearch(search as string);
    }, []);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            <Input.Search
                placeholder={search as string}
                allowClear
                enterButton="Search"
                size="large"
                onSearch={(value) => {
                    let values = value.replace(/\s+/g, "+");
                    console.log(values);
                    router.push(`/annunci/search/?search=${values}`);
                    onSearch(value);
                }}
            />
            {announcements.length === 0 ? (
                <p>No search results found.</p>
            ) : (
                <ul>
                    {announcements.map((announcement) => (
                        <a href={`/annunci/${announcement.id}`} key={announcement.id}>
                            <li key={announcement.id} style={{ display: 'flex', marginBottom: '1em' }}>
                                <img src={announcement.image} alt={announcement.title} width="200" height="200" />
                                <div style={{ marginLeft: '1em' }}>
                                    <h2>{announcement.title}</h2>
                                    <p>{announcement.author}</p>
                                </div>
                            </li>
                        </a>
                    ))}
                </ul>
            )}
        </div>
    );
};
