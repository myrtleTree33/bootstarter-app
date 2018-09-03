import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SocialLogin from 'react-social-login';
import userService from '../services/users';

const SocialButton = SocialLogin(({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    {children}
  </button>
));

class Login extends Component {
  constructor() {
    super();

    this._handlePostLogin = this._handlePostLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
  }

  _handlePostLogin(token, user) {
    console.log(`Logged in successfully!  Token=${token}`);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push('/');
  }

  handleGoogleLogin(user) {
    const token = user._token.accessToken;
    userService.loginGoogle(token).then(res => {
      const { user, token } = res;
      this._handlePostLogin(token, user);
    });
  }

  handleFacebookLogin(user) {
    const token = user._token.accessToken;
    console.log(token);
    userService.loginFacebook(token).then(res => {
      const { user, token } = res;
      this._handlePostLogin(token, user);
    });
  }

  handleSocialLoginFailure(err) {
    console.error('Unable to login user');
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <p>
          <SocialButton
            provider="google"
            appId={process.env.REACT_APP_GOOGLE_APP_ID}
            onLoginSuccess={this.handleGoogleLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
            Login with Google
          </SocialButton>
        </p>

        <p>
          <SocialButton
            provider="facebook"
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            onLoginSuccess={this.handleFacebookLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
            Login with Facebook
          </SocialButton>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  return {};
}

export default connect(
  mapState,
  null
)(withRouter(Login));
