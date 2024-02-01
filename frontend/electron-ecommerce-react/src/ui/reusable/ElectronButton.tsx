import React from "react";

type ElectronButtonProps = {
    children: React.ReactNode,
    loading?: boolean,
    textSize?: number,
    width?: number,

}

export const ElectronButton = ({loading, children, textSize, width}: ElectronButtonProps) => {
    return (
        <div className={"flex flex-col"}>
            <button
                className={"rounded-full text-electron-primary-white shadow-md p-[14px] h-[48px] "
                    + `${width ? 'w-[' + width + 'px] ' : ' '}`
                    + `${loading ? "bg-electron-primary-disabled-dark-blue " : "bg-electron-primary-dark-blue "}`
                    + `${textSize ? 'text-[' + textSize + 'px] ' : ''} `}
                disabled={loading}>
                {children}
            </button>
        </div>
    )
}