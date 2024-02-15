import {axiosPrivate, BASKET_API_PATH} from "../api/axios.ts";
import {useContext} from "react";
import {BasketContext} from "../context/BasketContext.tsx";

export const useFetchBasket = () => {
    const basketContext = useContext(BasketContext);

    return async () => {
        await axiosPrivate.get(BASKET_API_PATH + "/")
            .then(res => {

                basketContext.setBasket({items: res.data?.products})
                console.log(basketContext.basket)
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })

    }

}