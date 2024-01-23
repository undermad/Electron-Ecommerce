import {RefObject} from "react";

type FormErrorMessageProps = {
    paragraphRef: RefObject<HTMLParagraphElement>,
    errorMessage: string,
}

export const FormErrorMessage = ({paragraphRef, errorMessage}: FormErrorMessageProps) => {

    return (
        <p ref={paragraphRef}
           className={errorMessage ? "text-electron-error text-xl mb-4" : ""}>
            {errorMessage}
        </p>
    )
}