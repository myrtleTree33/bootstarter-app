import {
  SERVICE_USER_GOOGLE_LOGIN_URL,
  SERVICE_USER_GOOGLE_LOGOUT_URL,
  SERVICE_USER_GOOGLE_USER_GET_URL
} from "../constants";

/* global fetch */

export function loginGoogle(token) {
  return fetch("http://localhost:8081/auth/google/token", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    method: "POST",
    body: JSON.stringify({ access_token: token })
  }).then(res => res.json());
}

export function logoutGoogle() {
  // TODO
}

export function getUser() {
  console.log("I GOT CALLED");
  return fetch(SERVICE_USER_GOOGLE_USER_GET_URL).then(res => res.json());
}

export default { loginGoogle, logoutGoogle, getUser };
