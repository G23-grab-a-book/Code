'use client'
import React from 'react';
import {Input, Button, message, Form, Dropdown} from 'antd';
import { UserOutlined, WarningFilled } from '@ant-design/icons';


import './header.css';// File CSS per lo stile dell'header
import {useRouter} from "next/navigation";
import Link from "next/link";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import MenuItem from "antd/es/menu/MenuItem";
import axios from "axios";

const Header = () => {
  const router = useRouter();
  function handleProfileClick(){
      try {
          router.push("/profile");
      }catch (e){
          message.error("Please log in");
      }
  }
  const onSearch = async (value: string) => {
      try {
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
        <div className="title">
            <Link href={"/"} className="text"><h1 className="grab-a-book">Grab a Book</h1></Link>
        </div>
      </div>
      <div className="center-section">
          <Input.Search
              className={"search-input"}
              placeholder="Cerca un libro"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch} />
      </div>
      <div className="right-section">
        <div className="profile">
          <Button type="primary" shape="circle" icon={<UserOutlined/>} onClick={handleProfileClick} className={"profile-button"}></Button>
            <Button type='primary' onClick={onLogout} >Logout</Button>
        </div>
      </div>

    </header></>
  );
};

export default Header;
