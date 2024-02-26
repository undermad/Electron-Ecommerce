import React, {createContext, useState} from "react";
import {Address, defaultAddress} from "../api/dto/auth/Address.ts";

type CheckoutContextProps = {
    children: React.ReactNode;
}

type CheckoutContextType = {
    address: Address,
    setAddress: React.Dispatch<React.SetStateAction<Address>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export const CheckoutContext = createContext<CheckoutContextType>({
    address: defaultAddress,
    setAddress: () => {
    },
    loading: false,
    setLoading: () => {

    }
});

export const CheckoutContextProvider = ({children}: CheckoutContextProps) => {
    const [address, setAddress] = useState<Address>(defaultAddress);
    const [loading, setLoading] = useState<boolean>(false);

    return <CheckoutContext.Provider
        value={{address, setAddress, loading, setLoading}}>
        {children}
    </CheckoutContext.Provider>
}