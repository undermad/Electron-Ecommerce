import React, {createContext, useState} from "react";
import {Address, defaultAddress} from "../api/dto/auth/Address.ts";

type CheckoutContextProps = {
    children: React.ReactNode;
}

type CheckoutContextType = {
    address: Address,
    setAddress: React.Dispatch<React.SetStateAction<Address>>,
}

export const CheckoutContext = createContext<CheckoutContextType>({
        address: defaultAddress,
        setAddress: () => {
        },
    })
;

export const CheckoutContextProvider = ({children}: CheckoutContextProps) => {
    const [address, setAddress] = useState<Address>(defaultAddress);

    return <CheckoutContext.Provider value={{address, setAddress}}>{children}</CheckoutContext.Provider>
}