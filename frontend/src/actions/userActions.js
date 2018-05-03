import {
  USER_AUTH_ERROR,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED
} from "../constants/userConstants";

import userService from "../services/userService";

export function signIn() {
  return async dispatch => {
    try {
      const res = await userService.getUser();
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res));
    } catch (err) {
      dispatch({ type: USER_AUTH_ERROR, payload: {} });
    }
  };
}
