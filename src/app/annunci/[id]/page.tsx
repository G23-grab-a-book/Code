'use client'

import axios from "axios";
import {use} from "react"
import Link from "next/link";


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
                    <p>author: {ad.author}</p>
                    <p>category: {ad.category}</p>
                    <p>condition: {ad.condition}</p>
                    <p>price: {ad.price}€</p>
                    <p>isbn: {ad.ISBN}</p>
                    <p>sellerID: {ad.seller}</p>
                    <hr/>
                    <Link href={"/"}>Back to home</Link>
                </div>
            )}
        </div>

    )
}

export default ViewAnnuncio