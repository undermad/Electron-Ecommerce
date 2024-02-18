import React from "react";

type HeaderProps = {
    children: React.ReactNode,
}

export const Span = ({children}: HeaderProps) => {

    return (
        <span className={"text-electron-header-font text-[16px] font-[500] leading-5"}>
            {children}
        </span>
    )
}