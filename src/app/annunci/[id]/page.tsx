'use client'

import axios from "axios";
import { use, useEffect, useState } from "react"
import { Button, Spin } from "antd";
import Header from "@/app/header";


let id: string = "";
async function getAnnuncio(id: string) {
    try {
        const response = await axios.get(`/api/annunci/${id}`);
        return response.data || [];
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}

const fetchMap = new Map<string, Promise<any>>();
function queryClient(id: string, query: () => Promise<any>) {
    if (!fetchMap.has(id)) {
        fetchMap.set(id, query());
    }
    return fetchMap.get(id)!;
}

function ViewAnnuncio({ params, }: { params: { id: string; }; }) {
    interface Ad {
        title: string;
        author: string;
        category: string;
        condition: string;
        price: number;
        ISBN: string;
        seller: string;
    }

    const [ad, setAd] = useState<Ad | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAnnuncio = async () => {
            setIsLoading(true);
            const data = await getAnnuncio(params.id);
            setAd(data);
            const username = await axios.get("/api/user/", { params: { user: data.seller } });
            setUsername(username.data.data.username);
            console.log(username);
            setIsLoading(false);
        };

        fetchAnnuncio();
    }, [params.id]);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <><Header /><div>
            {ad && (
                <div className="annuncioBody">
                    <h2 className="Title">{ad.title}</h2>
                    <p>author: {ad.author}</p>
                    <p>category: {ad.category}</p>
                    <p>condition: {ad.condition}</p>
                    <p>price: {ad.price}€</p>
                    <p>isbn: {ad.ISBN}</p>
                    <p>sellerID: {ad.seller}</p>
                    <p>username: {username}</p>
                    <hr />
                </div>
            )}
        </div>
        <div>
            <Button type="default" shape="round" >"dsa!"</Button>
        </div>
        </>
    );
}

export default ViewAnnuncio