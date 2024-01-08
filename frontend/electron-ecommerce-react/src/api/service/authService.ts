import {LoginRequest} from "../dto/LoginRequest.ts";
import {LoginResponse} from "../dto/LoginResponse.ts";
import {LOGIN_API_PATH, REFRESH_TOKEN_API_PATH} from "../../constants/ApiPaths.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "../dto/ErrorResponse.ts";
import {axiosAuth} from "../axios.ts";
import {JwtResponse} from "../dto/JwtResponse.ts";


export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    return axiosAuth.post(LOGIN_API_PATH, data)
        .then((response: AxiosResponse<LoginResponse>) => {
            console.log(response.data)
            return response.data;
        })
        .catch((error: AxiosError) => {
            console.log(error.response?.status);
            const errorData = error.response?.data as ErrorResponse;
            console.log(errorData.message)
            throw new Error(errorData.message);
        })
}

export const refreshToken = async (): Promise<JwtResponse> => {
    return axiosAuth.get(REFRESH_TOKEN_API_PATH, {
        withCredentials: true,
    })
        .then((response: AxiosResponse<JwtResponse>) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error: AxiosError) => {
            console.log(error.status);
            console.log(error.message);
            const errorData = error.response?.data as ErrorResponse;
            throw new Error(errorData.message);
        })
}

