import userSVG from "../../assets/icons/user.svg";
import {useViewport} from "../custom_hooks/CustomHooks.ts";
import {Breakpoints} from "../custom_hooks/Breakpoints.ts";
import {Link} from "react-router-dom";

export const AccountLink = () => {
    const width = useViewport();


    return (
        <Link to={"/account"}>
            <div className={"flex gap-[8px] items-center"}>
                <img src={userSVG} className={"w-[20px] h-[20px]"} alt={'user svg icon'}/>

                {width >= Breakpoints.LARGE ?
                    <span>Login</span>
                    : ''}

            </div>
        </Link>
    )
}