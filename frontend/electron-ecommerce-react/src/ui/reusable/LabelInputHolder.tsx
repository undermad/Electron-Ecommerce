type LabelInputHolderProps = {
    children: React.ReactNode,
}

export const LabelInputHolder = ({children}: LabelInputHolderProps) => {

    return (
        <div className={"relative flex flex-col gap-[6px]"}>
            {children}
        </div>
    )
}