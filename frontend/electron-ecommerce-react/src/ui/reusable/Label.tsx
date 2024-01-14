type ParagraphLabelProps = {
    children: React.ReactNode,
    htmlFor: string,
}

export const Label = ({children, htmlFor}: ParagraphLabelProps) => {

    return (
        <label htmlFor={htmlFor} className={"text-[14px] text-electron-label-grey leading-5 font-[500]"}>
            {children}
        </label>
    )
}