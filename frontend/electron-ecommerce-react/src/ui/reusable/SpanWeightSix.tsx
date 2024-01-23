import React from "react";

type SpanWeightSixProps = {
    children: React.ReactNode,
}

export const SpanWeightSix = ({children}: SpanWeightSixProps) => {
    return (
        <span className={"font-[600]"}>
            {children}
        </span>
    )
}