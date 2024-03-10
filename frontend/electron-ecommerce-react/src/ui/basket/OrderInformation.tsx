import {CheckoutForm} from "./CheckoutForm.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const OrderInformation = () => {

    useScrollToTop();

    return (
        <>
            <CheckoutForm/>
        </>
    )
}