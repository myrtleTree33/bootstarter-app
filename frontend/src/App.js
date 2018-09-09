import React, { Component } from 'react';

import { CustomMenu, CustomRoutes } from './routes';
import userService from './services/users';
import logo from './logo.svg';
import './App.css';

import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor() {
    super();
    this.bootstrapUser = this.bootstrapUser.bind(this);
  }

  componentDidMount() {
    this.bootstrapUser();
  }

  bootstrapUser() {
    userService
      .getUser()
      .then(res => {
        const { user } = res;
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(err => console.error(`Unable to connect to backend API=${err}`));
  }

  render() {
    return (
      <Layout className="App">
        <Header>
          <div className="logo" />
          <CustomMenu />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <CustomRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Bootstarter-App ©2018</Footer>
      </Layout>
    );
  }
}

export default App;
