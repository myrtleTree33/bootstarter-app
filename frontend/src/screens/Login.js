import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SocialLogin from "react-social-login";
import * as userService from "../services/user";

const SocialButton = SocialLogin(({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    {children}
  </button>
));

class Login extends Component {
  constructor() {
    super();

    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
  }

  handleSocialLogin(user) {
    const token = user._token.accessToken;
    userService.loginGoogle(token).then(res => {
      const { user, token } = res;
      console.log(`Logged in successfully!  Token=${token}`);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      this.props.history.push('/');
    });
  }

  handleSocialLoginFailure(err) {
    console.error("Unable to login user");
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
      </div>
    );
  }
}

function mapState(state) {
  return {};
}

export default connect(mapState, null)(withRouter(Login));
