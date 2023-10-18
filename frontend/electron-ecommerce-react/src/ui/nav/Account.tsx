import userSVG from "../../assets/icons/user.svg";
import {useViewport} from "../custom_hooks/CustomHooks.ts";

export const Account = () => {
    const width = useViewport();



    return (
            <div className={"flex gap-[8px] items-center"}>
                <img src={userSVG} className={"w-[20px] h-[20px]"} alt={'user svg icon'}/>

                {width >= 1024 ?
                <span>Account</span>
                : ''}

            </div>
    )
}