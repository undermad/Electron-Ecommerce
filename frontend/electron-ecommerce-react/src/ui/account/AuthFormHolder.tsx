import React from "react";
import {Container} from "../reusable/Container.tsx";

type AuthFormHolderProps = {
    children: React.ReactNode,
}


export const AuthFormHolder = ({children}: AuthFormHolderProps) => {

    return (
        <Container>

            <template
                className={"flex justify-center mt-[16px] font-inter"}>
                <div className={"w-full h-[1024px] flex justify-center"}>
                    <div className={"w-full sm:w-[355px] mt-16"}>
                        {children}
                    </div>
                </div>
            </template>
        </Container>
    )
}