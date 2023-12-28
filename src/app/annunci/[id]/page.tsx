'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Spin } from "antd";
import "./annunci_page.css"

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
              </div>
            </div>
            <p style={{ fontSize: '16px', color: '#888' }}>di {ad.author}</p>
            <p>Condizione: {ad.condition}</p>
            <p>Categoria: {ad.category}</p>
            <p style={{ fontSize: '24px' }}>Compra ora a {ad.price.toLocaleString()} €</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewAnnuncio