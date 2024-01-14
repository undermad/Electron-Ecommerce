type LabelInputHolderProps = {
    children: React.ReactNode,
}

export const LabelInputHolder = ({children}: LabelInputHolderProps) => {

    return (
        <div className={"flex flex-col gap-[6px]"}>
            {children}
        </div>
    )
}