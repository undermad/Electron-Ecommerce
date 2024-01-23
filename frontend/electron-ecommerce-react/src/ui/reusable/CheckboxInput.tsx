import React, {ComponentProps} from "react";

type CheckboxInputProps = ComponentProps<"input"> & {
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
}


export const CheckboxInput = ({callback, ...props}: CheckboxInputProps) => {


    return (
        <input
            className={""}
            {...props}
            onChange={callback}
        />
    )

}