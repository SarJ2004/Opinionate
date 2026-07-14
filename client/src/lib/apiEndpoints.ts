import Env from "./env";
export const BASE_URL = `${Env.SERVER_URL}/api`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const GOOGLE_LOGIN_URL = `${BASE_URL}/auth/google-login`;
export const CHECK_CREDENTIALS_URL = `${BASE_URL}/auth/check/credentials`;
export const FORGET_PASSWORD_URL = `${BASE_URL}/auth/forget-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;

// Verso Route
export const VERSO_URL = `${BASE_URL}/verso`;
export const VERSO_ITEMS_URL = `${BASE_URL}/verso/items`;
export const TRENDING_VERSO_URL = `${BASE_URL}/verso/trending`;
