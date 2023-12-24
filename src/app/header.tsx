import React from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, WarningFilled } from '@ant-design/icons';

import './header.css'; // File CSS per lo stile dell'header

const Header = () => {
  function handleProfileClick(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <><header className="app-header">
      <div className="left-section">
        <div className="title">
          <h1>Grab a Book</h1>
        </div>
      </div>
      <div className="center-section">
        <Input placeholder="Cerca libri" className="search-input" />
      </div>
      <div className="right-section">
        <div className="profile">
          <Button type="primary" shape="circle" icon={<UserOutlined />}></Button>
        </div>
      </div>
      <Button type="primary" shape="round" icon={<WarningFilled />}></Button>
    </header><div>
        <Button type="primary" shape="circle" icon={<UserOutlined />}></Button>
      </div></>
  );
};

export default Header;
