'use client'

import axios from "axios";
import React, { use, useEffect, useState } from "react"
import { Button, Spin } from "antd";
import Header from "@/app/header";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import router, {useRouter} from "next/navigation";

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

    const router = useRouter();

    const [ad, setAd] = useState<Ad | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchAnnuncio = async () => {
            try{
                setIsLoading(true);
                const data = await getAnnuncio(params.id);
                setAd(data);
                const username = await axios.get("/api/user/", { params: { user: data.seller } });
                setUsername(username.data.data.username);
                setEmail(username.data.data.email);
                console.log(username);
                setIsLoading(false);
            }catch(e){
                router.push("/not-found");
            }
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
        <><div>
            {ad && (
                <div className="annuncio">
                    <div className="annuncio-header">
                        <h2 className="annuncio-title">{ad.title}</h2>
                        <Popup trigger={<Button type={"primary"}>Contatta</Button>}>
                            <div>
                                <p className="text">Email di {username}: {email}</p>
                            </div>
                        </Popup>
                    </div>
                    <hr/>
                    <div className="annuncio-body">
                        <p>Autore: {ad.author}</p>
                        <p>Categoria: {ad.category}</p>
                        <p>Condizione: {ad.condition}</p>
                        <p>Prezzo: {ad.price}€</p>
                        <p>ISBN: {ad.ISBN}</p>
                        <p>Venditore: {username}</p>
                    </div>
                    <hr/>
                </div>
            )}
        </div>
        </>
    );
}

export default ViewAnnuncio