import React from "react";

type AuthFormHolderProps = {
    children: React.ReactNode,
}


export const AuthFormHolder = ({children}: AuthFormHolderProps) => {

    return (
        <section
            className={"px-responsive-electron w-full max-w-[1440px] flex justify-center mt-[16px] font-inter"}>
            <div className={"h-[1024px]"}>
                <div className={"w-full md:w-[355px] mt-16"}>
                    {children}
                </div>
            </div>
        </section>
    )
}