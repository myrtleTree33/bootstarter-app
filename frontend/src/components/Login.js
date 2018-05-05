import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SocialLogin from "react-social-login";
import { signIn } from "../actions/userActions";
import * as userService from "../services/userService";

const SocialButton = SocialLogin(({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    {children}
  </button>
));

class Login extends Component {
  constructor() {
    super();

    this.loginGoogle = this.loginGoogle.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
  }

  componentDidMount() {
    console.log("here");
    setTimeout(() => {
      this.props.signIn();
    }, 2000);
  }

  handleSocialLogin(user) {
    console.log(user);
  }

  handleSocialLoginFailure(err) {
    console.error(err);
  }

  loginGoogle(e) {
    e.preventDefault();
    userService.loginGoogle();
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <SocialButton
          provider="google"
          appId="883436095959-sb5giars0htif4j30tk9a2828r9fi748.apps.googleusercontent.com"
          onLoginSuccess={this.handleSocialLogin}
          onLoginFailure={this.handleSocialLoginFailure}
        >
          Login with google
        </SocialButton>

        <button onClick={this.loginGoogle}>login with Google deprecated</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { signIn })(Login);
