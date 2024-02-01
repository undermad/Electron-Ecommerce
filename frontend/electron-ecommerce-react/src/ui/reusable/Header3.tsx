import React from "react";

type HeaderProps = {
    children: React.ReactNode,
    tailwind?: string
}

export const Header3 = ({children, tailwind}: HeaderProps) => {

    return (
        <h3 className={`${tailwind}` + " text-electron-header-font text-[20px] font-[600] leading-7"}>
            {children}
        </h3>
    )
}