import {useAuth} from "./useAuth.ts";
import {axiosAuth, LOGOUT_API_PATH, REFRESH_TOKEN_API_PATH} from "../api/axios.ts";

export const useLogout = () => {
    const auth = useAuth();

    return async () => {
        auth?.setAuth({});
        axiosAuth.post(REFRESH_TOKEN_API_PATH + LOGOUT_API_PATH)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }

}