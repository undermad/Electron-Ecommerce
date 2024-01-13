import React, {createContext, useState} from "react";

type MessageScreenContextProps = {
    children: React.ReactNode;
}

type MessageScreenContextType = {
    message: string | null,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>,
}

export const MessageScreenContext = createContext<MessageScreenContextType | null>(null);

export const MessageScreenContextProvider = ({children}: MessageScreenContextProps) => {
    const [message, setMessage] = useState<string | null>("No messages.");

    return (
        <MessageScreenContext.Provider value={{message, setMessage}}>
            {children}
        </MessageScreenContext.Provider>
    )
}