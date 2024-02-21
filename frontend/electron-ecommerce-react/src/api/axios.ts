import axios from "axios";

export const BASE_API_URL = "http://localhost:8080/api/v1";


export const AUTH_API_PATH = "/auth"
export const LOGIN_API_PATH = "/login";
export const REFRESH_TOKEN_API_PATH = "/refreshtoken";
export const LOGOUT_API_PATH = "/logout";
export const LOGOUT_EVERYWHERE = "/logout_everywhere";
export const FORGOT_PASSWORD_API_PATH = "/forgot_password";
export const CHANGE_FORGOTTEN_PASSWORD_API_PATH = "/change_forgotten_password"
export const CHANGE_PASSWORD_API_PATH = "/change_password";


export const REGISTRATION_API_PATH = "/registration"
export const REGISTER_API_PATH = "/register";
export const ACTIVATE_API_PATH = "/activate";

export const CATEGORY_API_PATH = "/category";
export const PRODUCT_API_PATH = "/product"

export const PRODUCT_CATEGORY_API_PATH = "/product";

export const BASKET_API_PATH = "/basket";
export const ADD = "/add";
export const REMOVE = "/remove";
export const GET = "/get";
export const GET_ALL = "/get_all";
export const UPDATE = "/update";
export const DELETE = "/delete";

export const ADDRESS_API_PATH = "/address";

export const ORDER_API_PATH = "/order";
export const BEGIN_CHECKOUT_API_PATH = "/begin_checkout";
export const GET_CHECKOUT_SUMMARY = "/get_checkout_summary";



export const axiosAuth = axios.create({
    baseURL: BASE_API_URL + AUTH_API_PATH,
    headers: {'Content-Type': 'application/json'},
    timeout: 10000,
    withCredentials: true,
});

export const axiosRegistration = axios.create({
    baseURL: BASE_API_URL + REGISTRATION_API_PATH,
    headers: {'Content-Type': 'application/json'},
    timeout: 10000,
    withCredentials: true,
});

export const axiosCategory = axios.create({
    baseURL: BASE_API_URL + CATEGORY_API_PATH,
    headers: {'Content-Type': 'application/json'},
    timeout: 10000,
})

export const axiosBase = axios.create({
    baseURL: BASE_API_URL,
    headers: {'Content-Type': 'application/json'},
    timeout: 10000,
})




