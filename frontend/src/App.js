import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import JwtAuth from './components/JwtAuth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/user/jwt" component={JwtAuth} />
        </Switch>
      </div>
    );
  }
}

export default App;
