import React from "react";

type BoldProps = {
    children: React.ReactNode,
    weight: number,
    textSize: number,
    leading?: number,
}

export const Bold = ({children, weight, textSize, leading}: BoldProps) => {


    return (
        <h3 className={`text-electron-header-font text-[${textSize}px] font-[${weight}] leading-${leading ? leading : 7}`}>
            {children}
        </h3>
    )
}