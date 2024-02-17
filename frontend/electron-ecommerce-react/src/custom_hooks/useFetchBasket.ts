import {BASKET_API_PATH} from "../api/axios.ts";
import {useContext} from "react";
import {BasketContext} from "../context/BasketContext.tsx";
import useAxiosPrivate from "./useAxiosPrivate.ts";

export const useFetchBasket = () => {
    const basketContext = useContext(BasketContext);
    const axiosPrivate = useAxiosPrivate();

    return async () => {
        await axiosPrivate.get(BASKET_API_PATH + "/")
            .then(res => {
                basketContext.setBasket({...basketContext.basket, items: res.data?.products})
                console.log('RES FROM THE FETCH BASKET')
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })

    }

}