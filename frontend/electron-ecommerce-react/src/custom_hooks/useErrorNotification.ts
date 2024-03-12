import {useContext} from "react";
import {ErrorNotificationContext} from "../context/ErrorNotificationContext.tsx";


export const useErrorNotification = () => {
    const errorNotificationContext = useContext(ErrorNotificationContext);
    return (message?: string) => {
        errorNotificationContext?.setMessage(`${message}`);
    }
}
