'use client'
import { RequiredField } from "@/app/helpers/validation";
import {Button, Form, message, Select} from "antd"
import axios from "axios";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import type { GetStaticProps, GetStaticPaths } from 'next'
import {use} from "react"


let id: string = "";
async function getAnnuncio(id: string){
    try{
        const response = await axios.get(`/api/annunci/${id}`);
        return response.data|| [];
    }catch (error: any){
        console.log(error.message);
        return [];
    }
}

const fetchMap = new Map<string, Promise<any>>();
function queryClient(id: string, query: () => Promise<any>){
    if(!fetchMap.has(id)){
        fetchMap.set(id, query());
    }
    return fetchMap.get(id)!;
}

function ViewAnnuncio ({ params, }: { params: { id: string; }; }) {
    const ad = use(queryClient(params.id, () => getAnnuncio(params.id)));
    console.log(ad);
    return (
        <div className="viewAnnuncio">
            {ad && (
                <div className="annuncioBody">
                    <h2 className="Title">{ad.title}</h2>
                    <p>id from url: {params.id}</p>
                    <p>title from ad: {ad.title}</p>
                    <p>author: {ad.author}</p>
                    <p>category: {ad.category}</p>
                    <p>condition: {ad.condition}</p>
                    <p>price: {ad.price}</p>
                    <p>isbn: {ad.ISBN}</p>
                    <p>seller: {ad.seller}</p>
                </div>
            )}
        </div>

    )
}

export default ViewAnnuncio