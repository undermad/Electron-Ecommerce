import {useAuth} from "./useAuth.ts";
import {axiosAuth, REFRESH_TOKEN_API_PATH} from "../api/axios.ts";
import {AxiosResponse} from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../constants/Routes.ts";
import {LoginResponse} from "../api/dto/auth/LoginResponse.ts";

type useRefreshTokenProps = {
    redirectToLogin: boolean
}

const useRefreshToken = ({redirectToLogin}: useRefreshTokenProps) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    return async () => {
        try {
            const result: AxiosResponse<LoginResponse> =
                await axiosAuth.get(REFRESH_TOKEN_API_PATH);
            auth?.setAuth({...result.data, loading: false})
            return result.data;
        } catch (error) {
            auth?.setAuth({loading: false});
            if (redirectToLogin) {
                navigate(LOGIN_ROUTE, {state: {from: location}, replace: true});
            }
            return null;
        }

    };
}

export default useRefreshToken;
