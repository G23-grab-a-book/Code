'use client'
import React, {useEffect, useState} from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';


import './header.css';// File CSS per lo stile dell'header
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import logo from "../../public/Logo.png";
import Image from "next/image";
import {Tooltip} from "react-tooltip";

const Header = () => {

  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isLogged = async () =>{
    try{
      const val = await axios.get("api/user");
      setLogged(true);
    }catch (e){
      // console.log("not logged");
      setLogged(false);
    }
  }
  useEffect(() => {
    isLogged();
  }, [pathname, searchParams]);

  const onSearch = async (value: string) => {
    try {
      if (value === null || value === undefined || value === "") {
        router.push("/");
        return;
      }
      router.push(`/annunci/search/?search=${value.replace(/\s+/g, "+")}`)
    } catch (error) {
      message.error((error as any).response.data.message);
    }
  };
  const onLogout = async () => {
    try {
      // console.log("logout");
      const res = await axios.get("/api/auth/logout");
      message.success(res.data.message);
      isLogged();
      // SetCurrentUser(null);
      router.push("/auth/login");
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  return (
    <><header className="app-header">
      <div className="left-section">
        <div className="header-title">
            <a href={"/"} className="grab-a-book">
              <h1 className="text">
                <Image src={logo} alt="logo" width={30} height={30} className="logo"/>
                Grab a Book</h1>
            </a>
        </div>
      </div>
      <div className="center-section">
        <Input.Search
          className="search-input"
          placeholder="Cerca un libro..."
          size='large'
          onSearch={onSearch}
          enterButton
          />
        <Tooltip anchorSelect=".search-input" place="bottom-start">
          <p className="text">
            Puoi effettuare la ricerca per titolo, isbn, autore e categoria<br/>
            Inserisci il titolo del libro che vuoi cercare oppure il codice isbn senza trattini e spazi<br/>
          </p>
          <hr style={{marginTop: "1%", marginBottom: "1%"}}/>
          <p className="text">
            Se vuoi cercare per categoria o autore scrivi: <br/>
          </p>
          <ul style={{marginLeft: "5%"}} className="text">
              <li>categoria:&#34;Horror&#34;</li>
              <li>autore:&#34;Pirandello&#34;</li>
          </ul>
        </Tooltip>
      </div>
      <div className="right-section">
        <div className="profile">
          <Button type="primary" shape="circle" icon={<UserOutlined />} className={"profile-button"} href='/profile'></Button>
          {logged && (<Button type='primary'style={{marginLeft:"0.25em"}} onClick={onLogout} >Logout</Button>)}
          {!logged && (<Button type='primary'style={{marginLeft:"0.25em"}} href="/auth/login">Login</Button>)}
        </div>
      </div>

    </header></>
  );
};

export default Header;
