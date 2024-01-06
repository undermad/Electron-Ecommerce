import axios from "axios";
import {AUTH, BASE_API_URL,} from "../constants/ApiPaths.ts";

export const axiosAuth = axios.create({
    baseURL: BASE_API_URL + AUTH,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});


