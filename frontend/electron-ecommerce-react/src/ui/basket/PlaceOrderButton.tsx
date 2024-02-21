import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";

export const PlaceOrderButton = () => {
    const messageScreen = useMessageScreen();

    const handleClick = () => {
        messageScreen("Order placed.");
    }


    return (
        <div onClick={handleClick}>
            <ElectronButton>Place Order</ElectronButton>
        </div>
    )
}