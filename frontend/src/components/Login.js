import React, { Component } from "react";
import PropTypes from "prop-types";
import rootService from '../services';


class Login extends Component {
  constructor() {
    super();
    this.loginGoogle = this.loginGoogle.bind(this);
  }

  loginGoogle(e) {
    e.preventDefault();
    rootService.userService.loginGoogle();
  }

  render() {
    return <div>
    <p>
    This is the login page
    </p>
    <button onClick={this.loginGoogle}>login with Google</button>
    </div>;
  }
}


export default Login;
