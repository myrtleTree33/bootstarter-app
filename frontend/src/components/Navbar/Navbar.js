import React from 'react';
import { Link } from 'react-router-dom';

export default ({}) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/protected">Protected</Link>
      </Menu.Item>
    </Menu>
  );
};
