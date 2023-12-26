"use client"

import { Button, message, Input } from 'antd'
import axios from 'axios';
import router, { useRouter } from 'next/navigation';
import Header from './header';

export default function Home() {
  const router = useRouter();

  const onSearch = async (value: string) => {
    try {
      console.log(value);
      // const response = await axios.post('/api/annunci/ricerca', { search: value});
      // // { title:"titolo", author: "autore", category: "categoria", ISBN: "isbn", price: 10.0, condition: "condizione", seller: "venditore" }
      // // handle the response
      // console.log(response.data.data);
      if (value === null || value === undefined || value === "") {
        router.push("/");
        return;
      }
      router.push(`/annunci/search/?search=${value}`)
    } catch (error) {
      message.error((error as any).response.data.message);
    }
  };

  const onLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      message.success("Logout successfully");
      // SetCurrentUser(null);
      router.push("/auth/login");
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  const test = async () => {
    try {
      let q = await axios.get("/api/user");
      message.success("test successfully");
      console.log(q.data.data);
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  return (
    <><Header /><div>
      <Input.Search
        placeholder="cerca il tuo libro"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch} />
      <div>
        <h1>Home Page</h1>
        <Button type='primary' onClick={onLogout}>Logout</Button>
      </div>
    </div></>
  )
}

