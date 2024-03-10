import React, {ComponentPropsWithRef, RefObject} from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputRef?: RefObject<HTMLInputElement>,
}

export const TextInput = ({callback, inputRef, ...props}: InputProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        callback(e);
    }

    return (
        <input
            className={"focus:ring-1  border rounded-[8px] border-electron-input-grey px-[14px] py-[10px] shadow-md focus:outline-0 placeholder:text-electron-placeholder-grey"}
            onChange={handleChange}
            ref={inputRef}
            {...props}
        />
    )

}