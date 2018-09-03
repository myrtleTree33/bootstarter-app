import {
  SERVICE_USER_GOOGLE_LOGIN_URL,
  SERVICE_USER_GOOGLE_LOGOUT_URL,
  SERVICE_USER_FACEBOOK_LOGIN_URL,
  SERVICE_USER_FACEBOOK_LOGOUT_URL,
  SERVICE_USER_GET_URL
} from '../constants/services/users.js';

import { fetchJson, fetchJsonAuth } from './_fetchUtils';

export function loginGoogle(token) {
  return fetchJson(SERVICE_USER_GOOGLE_LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({ access_token: token })
  });
}

export function logoutGoogle() {
  // TODO
}

export function loginFacebook(token) {
  return fetchJson(SERVICE_USER_FACEBOOK_LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({ access_token: token })
  });
}

export function logoutFacebook() {
  // TODO
}

export function getUser() {
  console.log('Get user got called');
  return fetchJsonAuth(SERVICE_USER_GET_URL);
}

export default {
  loginGoogle,
  logoutGoogle,
  loginFacebook,
  logoutFacebook,
  getUser
};
