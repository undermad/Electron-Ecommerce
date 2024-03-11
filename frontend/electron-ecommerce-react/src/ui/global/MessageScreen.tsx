import {useContext} from "react";
import {MessageScreenContext} from "../../context/MessageScreenContext.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";
import {Container} from "../reusable/Container.tsx";
import {BiMessageSquareDetail} from "react-icons/bi";


export const MessageScreen = () => {
    const message = useContext(MessageScreenContext);

    useScrollToTop();


    return (
        <Container>

            <div className={"w-full flex justify-center items-start"}>

                <div
                    className={"border border-electron-input-grey rounded-md w-full md:w-2/3 flex items-center justify-center"}>
                    <div className="w-1/4 flex justify-center items-center border-r border-electron-input-grey">
                        <BiMessageSquareDetail  size={50}/>
                    </div>
                    <div className="w-3/4 p-6">
                        {message?.message}
                    </div>

                </div>
            </div>
        </Container>
    )
}