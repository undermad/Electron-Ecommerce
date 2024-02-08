import React, {ComponentProps} from "react";

type CheckboxInputProps = ComponentProps<"input"> & {
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
}


export const CheckboxInput = ({callback, ...props}: CheckboxInputProps) => {


    return (
        <input
            className={"w-4 h-4 accent-electron-primary-dark-blue cursor-pointer"}
            {...props}
            onChange={callback}
        />
    )

}