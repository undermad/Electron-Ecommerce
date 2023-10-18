import React from "react";

interface UserLinksProps {
    children: React.ReactNode;
}

export const UserLinks = (props: UserLinksProps) => {


    return (
        <div className={"flex gap-[24px]"}>
            {props.children}
        </div>
    )
}