import {useAuth} from "./useAuth.ts";
import {axiosAuth, LOGOUT_API_PATH, REFRESH_TOKEN_API_PATH} from "../api/axios.ts";
import {useContext} from "react";
import {BasketContext} from "../context/BasketContext.tsx";
import {useErrorNotification} from "./useErrorNotification.ts";

export const useLogout = () => {
    const auth = useAuth();
    const basketContext = useContext(BasketContext);
    const errorNotification = useErrorNotification();

    return async () => {
        auth?.setAuth({});
        basketContext.setBasket({items: []})
        try {
            const response = await axiosAuth.post(REFRESH_TOKEN_API_PATH + LOGOUT_API_PATH);
            return response.data
        } catch (error) {
            errorNotification('Ups...')
        }
    }

}