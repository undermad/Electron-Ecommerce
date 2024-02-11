import React, {createContext, useState} from "react";
import {Basket} from "../api/dto/basket/Basket.ts";

type BasketContextProps = {
    children: React.ReactNode;
}

type BasketContextType = {
    basket: Basket | null,
    setBasket: React.Dispatch<React.SetStateAction<Basket>>,
}

export const BasketContext = createContext<BasketContextType>({
        basket: {
            items: [],
        },
        setBasket: () => {
        },
    })
;

export const BasketContextProvider = ({children}: BasketContextProps) => {
    const [basket, setBasket] = useState<Basket>({
        items: [],
    });

    return <BasketContext.Provider value={{basket, setBasket}}>{children}</BasketContext.Provider>
}