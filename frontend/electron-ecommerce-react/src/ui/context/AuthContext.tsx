import React, {createContext, useState} from "react";

type AuthContextProps = {
    children: React.ReactNode;
}
export type Auth = {
    email?: string,
    accessToken?: string,
    roles?: string[],
}

type AuthContextType = {
    auth: Auth | null,
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>,
}


export const AuthContext = createContext<AuthContextType | null>(null);



export const AuthContextProvider = ({children}: AuthContextProps) => {
    const [auth, setAuth] = useState<Auth | null>({});

    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
}