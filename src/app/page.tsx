"use client"

import {Button, message, Spin} from 'antd'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react";

type Announcement = { // smaller version of the announcement class
  id: string;
  title: string;
  author: string;
  price: number;
};

export default function Home() {
  const router = useRouter();

  // const onSearch = async (value: string) => {
  //   try {
  //     console.log(value);
  //     // const response = await axios.post('/api/annunci/ricerca', { search: value});
  //     // // { title:"titolo", author: "autore", category: "categoria", ISBN: "isbn", price: 10.0, condition: "condizione", seller: "venditore" }
  //     // // handle the response
  //     // console.log(response.data.data);
  //     if (value === null || value === undefined || value === "") {
  //       router.push("/");
  //       return;
  //     }
  //     router.push(`/annunci/search/?search=${value}`)
  //   } catch (error) {
  //     message.error((error as any).response.data.message);
  //   }
  // };

  // const onLogout = async () => {
  //   try {
  //     await axios.get("/api/auth/logout");
  //     message.success("Logout successfully");
  //     // SetCurrentUser(null);
  //     router.push("/auth/login");
  //   } catch (error: any) {
  //     message.error(error.response.data.message);
  //   }
  // };

  // const test = async () => {
  //   try {
  //     let q = await axios.get("/api/user");
  //     message.success("test successfully");
  //     console.log(q.data.data);
  //   } catch (error: any) {
  //     message.error(error.response.data.message);
  //   }
  // };
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSearch = async (value: string) => {
      setIsLoading(true);
      try {
          const response = await axios.get("/api/annunci/ricerca", { params: { search: "last" } });
          let annunci: Announcement[] = [];
          for (let i = 0; i < response.data.data.length; i++) {
              let annuncio: Announcement = {
                  id: response.data.data[i]._id,
                  title: response.data.data[i].title,
                  author: response.data.data[i].author,
                  price: response.data.data[i].price,
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
    console.log("search");
      onSearch("last");
  },[]);

  if (isLoading) {
      return (
          <><div className="flex justify-center"><h1 style={{ marginTop: '1em', marginBottom: '1em' }}>Gli ultimi annunci pubblicati</h1></div><div className="flex justify-center h-screen">
          <Spin size="large" />
        </div></>
      );
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginTop: '1em', marginBottom: '1em' }}>Gli ultimi annunci pubblicati</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {announcements.map((announcement) => (
          <li key={announcement.id} style={{ marginTop: '1em', marginBottom: '1em', border: '1px solid #ccc', padding: '1em' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ marginRight: '2em' }}>{announcement.title}</h2>
              <div style={{ flex: '1', textAlign: 'center' }}>
                <p style={{ color: 'grey' }}> di {announcement.author}</p>
              </div>
              <div style={{ textAlign: 'right', marginLeft: '4em' }}>
                <p>Prezzo: {announcement.price.toLocaleString(undefined, {minimumFractionDigits: 2})} €</p>
                <br />
                <Button shape='round' type='primary' href={`/annunci/${announcement.id}`}>Apri Annuncio</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

