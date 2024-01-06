import {LoginRequest} from "../dto/LoginRequest.ts";
import {LoginResponse} from "../dto/LoginResponse.ts";
import {LOGIN} from "../../constants/ApiPaths.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "../dto/ErrorResponse.ts";
import {axiosAuth} from "../axios.ts";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    return axiosAuth.post(LOGIN, data)
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