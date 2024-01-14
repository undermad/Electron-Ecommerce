import React from "react";

type Header2Props = {
    children: React.ReactNode,
}

export const Header2 = ({children}: Header2Props) => {

    return (
        <h2
            className={"text-electron-primary-dark-blue text-[24px] font-[600]"}>
            {children}
        </h2>
    )
}