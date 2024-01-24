type FormErrorMessageProps = {
    errorMessage: string,
}

export const FormErrorMessage = ({errorMessage}: FormErrorMessageProps) => {

    return (
        <p
           className={errorMessage ? "text-electron-error text-xl mb-4" : ""}>
            {errorMessage}
        </p>
    )
}