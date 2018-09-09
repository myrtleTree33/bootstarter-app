import React, { Component } from 'react';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import { Menu } from 'antd';

import Home from './screens/Home';
import Login from './screens/Login';
import Protected from './screens/Protected';

/**
 * Allows the creation of a protected route, if the user is not signed in.
 * @param {*} param0
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  // TODO refactor this if needed
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export const CustomMenu = ({}) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="0">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/protected">Protected</Link>
      </Menu.Item>
    </Menu>
  );
};

export const CustomRoutes = ({}) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </Switch>
  );
};
