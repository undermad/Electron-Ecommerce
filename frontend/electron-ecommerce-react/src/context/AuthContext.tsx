import React, {createContext, useState} from "react";
import {LoginResponse} from "../api/dto/LoginResponse.ts";

type AuthContextProps = {
    children: React.ReactNode;
}

type AuthContextType = {
    auth: LoginResponse | null,
    setAuth: React.Dispatch<React.SetStateAction<LoginResponse | null>>,
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: AuthContextProps) => {
    const [auth, setAuth] = useState<LoginResponse | null>({loading: true});

    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
}