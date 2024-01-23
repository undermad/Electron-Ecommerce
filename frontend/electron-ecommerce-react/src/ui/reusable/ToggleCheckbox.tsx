import {ComponentProps} from "react";

type ToggleCheckboxProps = ComponentProps<"input"> & {
    callback: () => void,
}


export const ToggleCheckbox = ({callback, ...props}: ToggleCheckboxProps) => {


    return (
        <input
            className={""}
            {...props}
            onChange={callback}
        />
    )

}