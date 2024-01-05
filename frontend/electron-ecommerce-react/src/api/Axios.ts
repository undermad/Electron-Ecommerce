import axios from "axios";
import {AUTH, BASE_API_URL} from "../constants/ApiPaths.ts";

export const axiosAuthApi = axios.create({
   baseURL: BASE_API_URL + AUTH,
   headers: {
      'Content-Type':'application/json',

   },
});