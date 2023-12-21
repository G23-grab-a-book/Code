"use client"

import { Button, message } from 'antd'
import axios from 'axios';
import router, { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  
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

  return (
      <div>
        <h1>Home Page</h1>
          <Button type='primary' onClick={onLogout}>Logout</Button>
          <button className="bg-blue-500 text-white p-2">Tailwid Button</button>
      </div>
  )
}
