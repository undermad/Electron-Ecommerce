import {useAuth} from "./useAuth.ts";
import {JwtResponse} from "../api/dto/JwtResponse.ts";
import {axiosAuth} from "../api/axios.ts";
import {REFRESH_TOKEN_API_PATH} from "../constants/ApiPaths.ts";
import {AxiosResponse} from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../constants/Routes.ts";

export const useRefreshToken = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return async () => {
        axiosAuth.get(REFRESH_TOKEN_API_PATH, {
            withCredentials: true
        }).then((result: AxiosResponse<JwtResponse>) => {
            console.log(result.data.token);
            console.log(result.data.tokenType);
            const temp = auth?.auth;
            auth?.setAuth({
                ...temp,
                token: result.data.token,
                tokenType: result.data.tokenType
            })
        }).catch(error => {
            console.log(error);
            navigate(LOGIN_ROUTE, { state: {from: location}, replace: true});
        })
    };
}
