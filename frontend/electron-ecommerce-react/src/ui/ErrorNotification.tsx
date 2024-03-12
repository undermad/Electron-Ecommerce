import {useContext, useEffect, useState} from "react";
import {ErrorNotificationContext} from "../context/ErrorNotificationContext.tsx";
import {MdErrorOutline} from "react-icons/md";

export const ErrorNotification = () => {

    const messageContext = useContext(ErrorNotificationContext);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if (messageContext?.message === 'CLEAR') return
        setVisible(true);
        if (messageContext?.message)
            setErrorMessage(messageContext?.message);
        setTimeout(() => {
            setVisible(false);
            if (messageContext?.setMessage)
                messageContext?.setMessage('CLEAR');
        }, 3000)


    }, [messageContext?.message]);

    return (
        <div
            className={`${visible ? 'flex' : 'hidden'}    fixed max-w-[340px] text-electron-primary-white e  left-[50%] bottom-[2%] -translate-x-1/2 z-50 bg-electron-notification-error py-2 px-4 rounded-lg flex justify-center items-center gap-2`}>
            <MdErrorOutline size={20}/>
            <p className="font-[500]">{errorMessage}</p>
        </div>
    )
}