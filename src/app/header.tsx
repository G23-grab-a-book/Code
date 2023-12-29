'use client'
import React, {useState} from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';


import './header.css';// File CSS per lo stile dell'header
import { useRouter } from "next/navigation";
import Link from "next/link";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import MenuItem from "antd/es/menu/MenuItem";
import axios from "axios";
import logo from "../../public/Logo.png";
import Image from "next/image";
import {Tooltip} from "react-tooltip";

const Header = () => {

  const router = useRouter();

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
      console.log("logout");
      const res = await axios.get("/api/auth/logout");
      message.success(res.data.message);
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
              <hr style={{marginTop: "1%", marginBottom: "1%"}}/>
              Se vuoi cercare per categoria o autore scrivi: <br/>
              <ul style={{marginLeft: "5%"}}>
                <li>categoria:&#34;Horror&#34;</li>
                <li>autore:&#34;Pirandello&#34;</li>
              </ul>

            </p>
          </Tooltip>
      </div>
      <div className="right-section">
        <div className="profile">
          <Button type="primary" shape="circle" icon={<UserOutlined />} className={"profile-button"} href='/profile'></Button>
          <Button type='primary'style={{marginLeft:"0.25em"}} onClick={onLogout} >Logout</Button>
        </div>
      </div>

    </header></>
  );
};

export default Header;
