type LabelCheckboxHolderProps = {
    children: React.ReactNode,
    tailwind?: string,
    key?: number
}

export const LabelCheckboxHolder = ({children, tailwind}: LabelCheckboxHolderProps) => {

    return (
        <div className={"flex gap-3 ju items-center " + tailwind}>
            {children}
        </div>
    )
}