import React, {ComponentProps} from "react";
import {CgSpinner} from "react-icons/cg";

type ElectronButtonProps = ComponentProps<"button"> & {
    children: React.ReactNode,
    loading?: boolean,
    textSize?: number,
    width?: number,
    rounded?: string,
    form?: string,
}

export const ElectronButton = ({loading, children, textSize, width, rounded, form, ...props}: ElectronButtonProps) => {
    return (
        <div className={"flex flex-col"}>
            <button
                form={`${form ? form : ''}`}
                type={`${form ? 'submit' : 'button'}`}
                {...props}
                className={"text-electron-primary-white shadow-md p-[14px] h-[48px]  "
                    + `${width ? 'w-[' + width + 'px] ' : ' '}`
                    + `${rounded ? `rounded-${rounded} ` : 'rounded-full '}`
                    + `${loading ? "bg-electron-primary-disabled-dark-blue " : "bg-electron-primary-dark-blue "}`
                    + `${textSize ? 'text-[' + textSize + 'px] ' : ''} `}
                disabled={loading}>

                <div className="w-full items-center justify-center flex">
                    <div className={`${loading ? "animate-spin " : 'hidden '} h-[24px] w-[24px]`}>
                        <CgSpinner size={24}/>
                    </div>
                </div>
                <div className={`${loading ? "hidden" : ''}`}>
                    {children}
                </div>
            </button>
        </div>
    )
}