import React from "react";

type AuthFormHolderProps = {
    children: React.ReactNode,
}


export const AuthFormHolder = ({children}: AuthFormHolderProps) => {

    return (
        <section
            className={"px-responsive-electron w-full max-w-[1440px] flex justify-center mt-[16px] font-inter"}>
            <div className={"w-full h-[1024px] flex justify-center"}>
                <div className={"w-full sm:w-[355px] mt-16"}>
                    {children}
                </div>
            </div>
        </section>
    )
}