import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const Missing = () => {
    useScrollToTop();
    return (
        <div className={"w-full border-t-2"}>
            Page not found
        </div>
    )
}