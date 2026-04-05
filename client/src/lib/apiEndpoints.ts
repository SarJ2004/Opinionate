import Env from "./env";
export const BASE_URL = `${Env.SERVER_URL}/api`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const CHECK_CREDENTIALS_URL = `${BASE_URL}/auth/check/credentials`;
export const FORGET_PASSWORD_URL = `${BASE_URL}/auth/forget-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;

// Opinion Route
export const OPINION_URL = `${BASE_URL}/opinion`;
export const OPINION_ITEMS_URL = `${BASE_URL}/opinion/items`;
