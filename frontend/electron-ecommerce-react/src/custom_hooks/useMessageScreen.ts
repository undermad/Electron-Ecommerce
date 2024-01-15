import {useContext} from "react";
import {MessageScreenContext} from "../context/MessageScreenContext.tsx";
import {useNavigate} from "react-router-dom";
import {MESSAGE_SCREEN_ROUTE} from "../constants/Routes.ts";


export const useMessageScreen = () => {
    const messageContext = useContext(MessageScreenContext);
    const navigate = useNavigate();

    return (message: string) => {
        messageContext?.setMessage(message);
        navigate(MESSAGE_SCREEN_ROUTE);
    }
}
