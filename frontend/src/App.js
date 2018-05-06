import React, { Component } from "react";
import { Redirect, Link, Switch, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import JwtAuth from "./components/JwtAuth";
import Protected from './components/Protected';

const isAuthenticated = true; // TODO remove

/**
 * Allows the creation of a protected route, if the user is not signed in.
 * @param {*} param0 
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

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
            <Link to="/protected">Protected</Link>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/user/jwt" component={JwtAuth} />
          <PrivateRoute path="/protected" component={Protected} />
        </Switch>
      </div>
    );
  }
}

export default App;
