import axios from "axios";
import {AUTH_API_PATH, BASE_API_URL,} from "../constants/ApiPaths.ts";

export const axiosAuth = axios.create({
    baseURL: BASE_API_URL + AUTH_API_PATH,
    headers: {'Content-Type': 'application/json'},
});

export const axiosPrivate = axios.create({
    baseURL: BASE_API_URL,
    headers: {'Content-Type': 'application/json'},
    timeout: 10000,
    withCredentials: true,
});


