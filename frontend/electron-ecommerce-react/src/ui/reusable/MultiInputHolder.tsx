import React from "react";

type MultiInputHolderProps = {
    children: React.ReactNode,
}

export const MultiInputHolder = ({children}: MultiInputHolderProps) => {

    return(
        <div className={"flex flex-col gap-[16px]"}>
            {children}
        </div>
    )
}