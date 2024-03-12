import {BASKET_API_PATH} from "../api/axios.ts";
import {useContext} from "react";
import {BasketContext} from "../context/BasketContext.tsx";
import useAxiosPrivate from "./useAxiosPrivate.ts";
import {useErrorNotification} from "./useErrorNotification.ts";

export const useFetchBasket = () => {
    const basketContext = useContext(BasketContext);
    const axiosPrivate = useAxiosPrivate();
    const errorNotification = useErrorNotification();

    return async () => {
        await axiosPrivate.get(BASKET_API_PATH + "/")
            .then(res => {
                basketContext.setBasket({...basketContext.basket, items: res.data?.products})
            })
            .catch(() => {
                errorNotification('Ups...')
            })

    }

}