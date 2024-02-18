import {useNavigate} from "react-router-dom";
import {CHECKOUT_ROUTE} from "../../constants/Routes.ts";
import {ElectronButton} from "../reusable/ElectronButton.tsx";

export const ContinueToCheckoutButton = () => {
    const navigate = useNavigate();

    const continueToCheckout = () => {
        navigate(CHECKOUT_ROUTE);
    }




    return (
        <div onClick={continueToCheckout}>
            <ElectronButton>Continue Checkout</ElectronButton>
        </div>
    )


}