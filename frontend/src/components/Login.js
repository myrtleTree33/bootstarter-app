import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signIn } from "../actions/userActions";
import * as userService from "../services/userService";

class Login extends Component {
  constructor() {
    super();

    this.loginGoogle = this.loginGoogle.bind(this);
  }

  componentDidMount() {
    console.log('here');
    setTimeout(() => {
      this.props.signIn();
    }, 2000);
  }

  loginGoogle(e) {
    e.preventDefault();
    userService.loginGoogle();
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.loginGoogle}>login with Google</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { signIn })(Login);
