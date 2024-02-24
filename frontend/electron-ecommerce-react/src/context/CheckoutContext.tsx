import React, {createContext, useState} from "react";
import {Address, defaultAddress} from "../api/dto/auth/Address.ts";

type CheckoutContextProps = {
    children: React.ReactNode;
}

type CheckoutContextType = {
    address: Address,
    setAddress: React.Dispatch<React.SetStateAction<Address>>,
    setFormSubmit: React.Dispatch<React.SetStateAction<()=> void>>;
    formSubmit: () => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
        address: defaultAddress,
        setAddress: () => {
        },
        setFormSubmit: () => {
        },
        formSubmit: () => {
        },

    })
;

export const CheckoutContextProvider = ({children}: CheckoutContextProps) => {
    const [address, setAddress] = useState<Address>(defaultAddress);
    const [formSubmit, setFormSubmit] = useState<() => void>(() => () => {});

    return <CheckoutContext.Provider value={{address, setAddress, formSubmit, setFormSubmit}}>{children}</CheckoutContext.Provider>
}