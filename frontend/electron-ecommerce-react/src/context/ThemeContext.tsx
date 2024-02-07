import React, {createContext, SetStateAction, useState} from "react";

type ThemeContextProps = {
    children: React.ReactNode;
}

type ThemeContextType = {
    fadeAwayBackground: boolean,
    setFadeAwayBackground: React.Dispatch<SetStateAction<boolean>>,
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider = ({children}: ThemeContextProps) => {
    const [fadeAwayBackground, setFadeAwayBackground] = useState<boolean>(false);

    return (
        <ThemeContext.Provider value={{fadeAwayBackground, setFadeAwayBackground}}>
            {children}
        </ThemeContext.Provider>
    )
}