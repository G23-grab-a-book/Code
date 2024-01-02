'use client'

import axios from "axios";
import { Button, Spin } from "antd";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { useRouter } from "next/navigation";
import React, { useEffect, useState, } from "react"
import "./annunci_page.css"
import Link from "next/link";

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
      try {
        setIsLoading(true);
        const data = await getAnnuncio(params.id);
        setAd(data.ad);
        const username = await axios.get("/api/user/", { params: { user: data.ad.seller } });
        setUsername(username.data.data.username);
        setEmail(username.data.data.email);
        setIsLoading(false);
      } catch (e) {
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
    <>
      {ad && (
        <div className="ad-details-container">
          <div className="ad-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1>{ad.title}</h1>
              </div>
              <div>
                <p style={{ fontSize: '18px', color: '#888', textAlign: 'right' }}>ISBN: {ad.ISBN}</p>
                <p style={{ fontSize: '18px', color: '#888', textAlign: 'right' }}>Venduto da: {username}</p>
                <div style={{ textAlign: 'right'}}>
                  <Popup trigger={<Button type={"primary"}>Contatta</Button>}>
                    <div>
                      <p className="text">Email di {username}: {email}</p>
                    </div>
                  </Popup>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '16px', color: '#888' }}>di <Link style={{ fontSize: '16px', color: '#666' }} href={`/annunci/search?search=autore:"${ad.author.replace(' ','+')}"`}>{ad.author}</Link></p>
            <p>Categoria: <Link style={{color:'black'}} href={`/annunci/search?search=categoria:"${ad.category.replace(' ','+')}"`}>{ad.category}</Link></p>
            <p>Condizione: {ad.condition}</p>
            <p style={{ fontSize: '24px' }}>Compra ora a {ad.price.toLocaleString(undefined, {minimumFractionDigits: 2})} €</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewAnnuncio