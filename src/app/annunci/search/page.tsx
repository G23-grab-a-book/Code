"use client"
import { message, Input, Spin, Button, Space } from 'antd';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Announcement = {
  id: string;
  title: string;
  author: string;
  price: number;
};

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
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
    onSearch(search as string);
  }, [search]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {announcements.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <p>Nessun annuncio trovato. Riprovare con una ricerca diversa</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {announcements.map((announcement) => (
            <li key={announcement.id} style={{ marginTop: '1em', marginBottom: '1em', border: '1px solid #ccc', padding: '1em' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '2em' }}>{announcement.title}</h2>
                <div style={{ flex: '1', textAlign: 'center' }}>
                  <p style={{ color: 'grey' }}> di {announcement.author}</p>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '4em' }}>
                  <p>Prezzo: {announcement.price.toLocaleString()} €</p>
                  <br />
                  <Button shape='round' type='primary' href={`/annunci/${announcement.id}`}>Apri Annuncio</Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div></>
  );
};
