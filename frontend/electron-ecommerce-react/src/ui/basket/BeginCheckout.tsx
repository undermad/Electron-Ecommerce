import {useNavigate} from "react-router-dom";
import {CHECKOUT_ROUTE} from "../../constants/Routes.ts";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {BEGIN_CHECKOUT_API_PATH, CHECKOUT_API_PATH} from "../../api/axios.ts";
import {useContext, useState} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";

type BeginCheckoutProps = {
    loadingParent: boolean,
}

export const BeginCheckout = ({loadingParent}: BeginCheckoutProps) => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const basketContext = useContext(BasketContext);
    const [loading, setLoading] = useState<boolean>(loadingParent);


    const continueToCheckout = () => {
        setLoading(true)
        if(basketContext.basket.items.length === 0) return;
        axiosPrivate.post(CHECKOUT_API_PATH + BEGIN_CHECKOUT_API_PATH)
            .then(() => {
                navigate(CHECKOUT_ROUTE);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setLoading(false));

    }


    return (
        <div onClick={continueToCheckout}>
            <ElectronButton loading={loading}>Start Checkout</ElectronButton>
        </div>
    )


}