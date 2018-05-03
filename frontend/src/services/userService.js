import {
  SERVICE_USER_GOOGLE_LOGIN_URL,
  SERVICE_USER_GOOGLE_LOGOUT_URL,
  SERVICE_USER_GOOGLE_USER_GET_URL
} from "../constants";

/* global fetch */

export function loginGoogle() {
  // login directly to window loc
  return (window.location.href = SERVICE_USER_GOOGLE_LOGIN_URL);
}

export function logoutGoogle() {
  // TODO
}

export function getUser() {
  console.log('I GOT CALLED');
  return fetch(SERVICE_USER_GOOGLE_USER_GET_URL).then(res => res.json());
}

export default { loginGoogle, logoutGoogle, getUser };
