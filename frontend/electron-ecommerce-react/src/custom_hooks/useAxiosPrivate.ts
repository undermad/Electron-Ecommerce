import axios, {AxiosResponse} from "axios";
import useRefreshToken from "./useRefreshToken.ts";
import {useAuth} from "./useAuth.ts";
import {BASE_API_URL} from "../api/axios.ts";
import {useEffect} from "react";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken({redirectToLogin: true});
    const auth = useAuth();

    const axiosPrivate = axios.create({
        baseURL: BASE_API_URL,
        headers: {'Content-Type': 'application/json'},
        timeout: 10000,
        withCredentials: true,
    });

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `${auth?.auth?.tokenType} ` + auth?.auth?.token;
                }
                return config;
            }, (error) => Promise.reject(error));

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest.retry) {
                    prevRequest.retry = true;
                    let newAccessToken;
                    await refresh().then(result => newAccessToken = result?.token);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            });

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;

