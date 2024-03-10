import {useContext} from "react";
import {MessageScreenContext} from "../../context/MessageScreenContext.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";



export const MessageScreen = () => {
    const message = useContext(MessageScreenContext);

    useScrollToTop();


    return (
        <div className={"w-full border-t-2"}>
            {message?.message}
        </div>
    )
}