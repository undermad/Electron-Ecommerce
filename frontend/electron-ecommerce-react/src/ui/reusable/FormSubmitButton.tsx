type FormSubmitButtonProps = {
    loading: boolean,
}

export const FormSubmitButton = ({loading}: FormSubmitButtonProps) => {
    return (
        <div className={"flex flex-col mt-[24px]"}>
            <button
                className={"rounded-full text-electron-primary-white shadow-md p-[14px] h-[48px] "
                    + `${loading ? "bg-electron-primary-disabled-dark-blue" : "bg-electron-primary-dark-blue"}`}
                disabled={loading}>
                Log In
            </button>
        </div>
    )
}