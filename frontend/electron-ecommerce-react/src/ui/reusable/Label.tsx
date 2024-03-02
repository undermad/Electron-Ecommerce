type LabelProps = {
    children?: React.ReactNode,
    htmlFor: string,
    errorMessage?: string,
}

export const Label = ({children, htmlFor, errorMessage = ''}: LabelProps) => {

    return (
        <label htmlFor={htmlFor} className={`text-[14px] ${errorMessage ? 'text-electron-error' : 'text-electron-label-grey'} leading-5 font-[500]`}>
            {errorMessage ?
                <span>* {children} ({errorMessage})</span>
                :
                <>{children}</>
            }
        </label>
    )
}