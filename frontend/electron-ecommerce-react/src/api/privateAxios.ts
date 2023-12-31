import {AxiosResponse} from "axios";
import {useRefreshToken} from "../custom_hooks/useRefreshToken.ts";
import {useAuth} from "../custom_hooks/useAuth.ts";
import {axiosPrivate} from "./axios.ts";
import {useEffect} from "react";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const auth = useAuth();


    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `${auth?.auth?.tokenType} ` + auth?.auth?.token;
            }
            return config;
        }, (error) => Promise.reject(error));

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response: AxiosResponse) =>
                response,
            async (error) => {
                const prevRequest = error.config;
                if (error?.response?.status === 401 && !prevRequest.retry) {
                    prevRequest.retry = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `${auth?.auth?.tokenType} ${newAccessToken}`;
                    return prevRequest;
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;

