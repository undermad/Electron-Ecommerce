import {useAuth} from "./useAuth.ts";
import {axiosAuth} from "../api/axios.ts";
import {LOGOUT_API_PATH, REFRESH_TOKEN_API_PATH} from "../constants/ApiEndpointsPaths.ts";

export const useLogout = () => {
    const auth = useAuth();

    return async () => {
        auth?.setAuth({});
        axiosAuth.get(REFRESH_TOKEN_API_PATH + LOGOUT_API_PATH)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }

}