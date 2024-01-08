import {useAuth} from "./useAuth.ts";
import {refreshToken} from "../api/service/authService.ts";
import {ErrorResponse} from "../api/dto/ErrorResponse.ts";
import {JwtResponse} from "../api/dto/JwtResponse.ts";

export const useRefreshToken = () => {
    const auth = useAuth();

    const refresh = async () => {
        refreshToken()
            .then((response: JwtResponse) => {
                auth?.setAuth({
                    token: response.token,
                    tokenType: response.tokenType
                })
            })
            .catch((error: ErrorResponse) => console.log(error.message));
    }

    return refresh;
}
