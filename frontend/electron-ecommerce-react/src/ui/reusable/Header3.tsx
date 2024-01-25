import React from "react";

type HeaderProps = {
    children: React.ReactNode,
}

export const Header3 = ({children}: HeaderProps) => {

    return (
        <h3 className={"text-electron-header-font text-[20px] font-[600] leading-7"}>
            {children}
        </h3>
    )
}