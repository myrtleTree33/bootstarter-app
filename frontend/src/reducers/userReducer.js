import { createReducer } from "./baseReducer";
import { rootService } from "../services/index";
import {
  USER_AUTH_ERROR,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED
} from "../constants/userConstants";

const initialState = {
  authenticated: false
};

function userAuthenticated(state, action) {
  return { ...state, authenticated: true };
}

function userUnauthenticated(state, action) {
  return { ...state, authenticated: false };
}

function userAuthError(state, action) {
  return { ...state, authenticated: false };
}

export default createReducer(initialState, {
  [USER_AUTHENTICATED]: userAuthenticated,
  [USER_UNAUTHENTICATED]: userUnauthenticated,
  [USER_AUTH_ERROR]: userAuthError
});
