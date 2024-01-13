import {useContext} from "react";
import {MessageScreenContext} from "../../context/MessageScreenContext.tsx";



export const MessageScreen = () => {
    const message = useContext(MessageScreenContext);


    return (
        <div className={"w-full border-t-2"}>
            {message?.message}
        </div>
    )
}