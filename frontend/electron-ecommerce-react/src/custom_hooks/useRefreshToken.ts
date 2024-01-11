import {useAuth} from "./useAuth.ts";
import {axiosAuth} from "../api/axios.ts";
import {REFRESH_TOKEN_API_PATH} from "../constants/ApiEndpointsPaths.ts";
import {AxiosResponse} from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../constants/Routes.ts";
import {LoginResponse} from "../api/dto/LoginResponse.ts";

type useRefreshTokenProps = {
    redirectToLogin: boolean
}

export const useRefreshToken = ({redirectToLogin}: useRefreshTokenProps) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return async () => {
        axiosAuth.get(REFRESH_TOKEN_API_PATH)
            .then((result: AxiosResponse<LoginResponse>) => {
            console.log(result.data);
            auth?.setAuth({...result.data, loading: false})
        })
            .catch(error => {
                auth?.setAuth({loading: false});
            console.log(error);
            if (redirectToLogin) {
                navigate(LOGIN_ROUTE, {state: {from: location}, replace: true});
            }
        })
    };
}
