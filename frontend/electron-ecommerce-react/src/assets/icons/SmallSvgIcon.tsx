type SmallSvgIconProps = {
    children: React.ReactNode;
}

export const SmallSvgIcon = ({children}: SmallSvgIconProps) => {
    return (
        <div className={"w-[20px] h-[20px] cursor-pointer"}>
            {children}
        </div>
    )
}