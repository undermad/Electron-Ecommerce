import React from "react";

type ContainerProps = {
    children: React.ReactNode,
}

export const Container = ({children}: ContainerProps) => {

    return (
        <section className={"max-w-[1440px] w-full px-[30px] sm:px-[40px] lg:px-[100px]"}>
            {children}
        </section>
    )

}