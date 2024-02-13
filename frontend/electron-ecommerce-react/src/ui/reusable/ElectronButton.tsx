import React, {ComponentProps} from "react";

type ElectronButtonProps = ComponentProps<"button"> & {
    children: React.ReactNode,
    loading?: boolean,
    textSize?: number,
    width?: number,
    rounded?: string
}

export const ElectronButton = ({loading, children, textSize, width, rounded, ...props}: ElectronButtonProps) => {
    return (
        <div className={"flex flex-col"}>
            <button
                {...props}
                className={"text-electron-primary-white shadow-md p-[14px] h-[48px]  "
                    + `${width ? 'w-[' + width + 'px] ' : ' '}`
                    + `${rounded ? `rounded-${rounded} ` : 'rounded-full '}`
                    + `${loading ? "bg-electron-primary-disabled-dark-blue " : "bg-electron-primary-dark-blue "}`
                    + `${textSize ? 'text-[' + textSize + 'px] ' : ''} `}
                disabled={loading}>
                {children}
            </button>
        </div>
    )
}