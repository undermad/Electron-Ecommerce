type CheckboxLabelProps = {
    children: React.ReactNode,
    htmlFor: string,
}

export const CheckboxLabel = ({children, htmlFor}: CheckboxLabelProps) => {

    return (
        <label htmlFor={htmlFor} className={"text-[12px] font-[400] leading-5"}>
            {children}
        </label>
    )
}