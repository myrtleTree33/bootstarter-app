import {
  SERVICE_USER_GOOGLE_LOGIN_URL,
  SERVICE_USER_GOOGLE_LOGOUT_URL,
  SERVICE_USER_GOOGLE_USER_GET_URL
}
from '../constants';

const userService = { loginGoogle, logoutGoogle, getUser };


/* global fetch */

function loginGoogle() {
  // login directly to window loc
  return window.location.href = SERVICE_USER_GOOGLE_LOGIN_URL;
}


function logoutGoogle() {
  // TODO
}

function getUser() {
  return fetch(SERVICE_USER_GOOGLE_LOGIN_URL)
    .then(res => res.json());
}

export default userService;
