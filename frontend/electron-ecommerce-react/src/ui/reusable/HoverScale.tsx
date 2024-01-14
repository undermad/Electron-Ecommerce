type HoverScaleProps = {
    children: React.ReactNode;
}

export const HoverScale = ({children}: HoverScaleProps) => {

    return (
        <div className={"hover:scale-105"}>
            {children}
        </div>
    )
}