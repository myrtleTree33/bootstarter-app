import { BACKEND_ROOT_URL } from './common.js';

export const SERVICE_USER_GET_URL = `${BACKEND_ROOT_URL}/users/user`;

export const SERVICE_USER_GOOGLE_LOGIN_URL = `${BACKEND_ROOT_URL}/auth/google/token`;
export const SERVICE_USER_GOOGLE_LOGOUT_URL = `${BACKEND_ROOT_URL}/auth/google/logout`;

export const SERVICE_USER_FACEBOOK_LOGOUT_URL = `${BACKEND_ROOT_URL}/auth/facebook/logout`;
export const SERVICE_USER_FACEBOOK_LOGIN_URL = `${BACKEND_ROOT_URL}/auth/facebook/token`;
