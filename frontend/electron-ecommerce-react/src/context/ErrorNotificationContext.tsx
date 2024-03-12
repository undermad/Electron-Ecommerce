import React, {createContext, useState} from "react";

type ErrorNotificationContextProps = {
    children: React.ReactNode;
}

type ErrorNotificationContextType = {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
}

export const ErrorNotificationContext = createContext<ErrorNotificationContextType | null>(null);

export const ErrorNotificationContextProvider = ({children}: ErrorNotificationContextProps) => {
    const [message, setMessage] = useState<string>("CLEAR");

    return (
        <ErrorNotificationContext.Provider value={{message, setMessage}}>
            {children}
        </ErrorNotificationContext.Provider>
    )
}