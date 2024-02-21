import {useNavigate} from "react-router-dom";
import {CHECKOUT_ROUTE} from "../../constants/Routes.ts";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {BEGIN_CHECKOUT_API_PATH, ORDER_API_PATH} from "../../api/axios.ts";
import {useContext} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";

export const ContinueToCheckoutButton = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const basketContext = useContext(BasketContext);

    const continueToCheckout = () => {
        if(basketContext.basket.items.length === 0) return;
        axiosPrivate.post(ORDER_API_PATH + BEGIN_CHECKOUT_API_PATH)
            .then(() => {
                navigate(CHECKOUT_ROUTE);
            })
            .catch(error => {
                console.log(error);
            })

    }


    return (
        <div onClick={continueToCheckout}>
            <ElectronButton>Continue Checkout</ElectronButton>
        </div>
    )


}