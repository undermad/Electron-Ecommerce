import {ComponentProps} from "react";

type ToggleCheckboxProps = ComponentProps<"input"> & {
    callback: () => void,
}


export const ToggleCheckbox = ({callback, ...props}: ToggleCheckboxProps) => {


    return (
        <input
            className={"w-4 h-4 accent-electron-primary-dark-blue cursor-pointer"}
            {...props}
            onChange={callback}
        />
    )

}