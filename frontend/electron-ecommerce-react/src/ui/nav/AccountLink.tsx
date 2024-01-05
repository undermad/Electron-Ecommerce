import userSVG from "../../assets/icons/user.svg";
import {useViewport} from "../custom_hooks/useViewport.ts";
import {Breakpoints} from "../custom_hooks/Breakpoints.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HOME, LOGIN} from "../../constants/Routes.ts";
import {useAuth} from "../custom_hooks/useAuth.ts";

export const AccountLink = () => {
    const width = useViewport();
    const auth = useAuth();

    const navigation = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || HOME;


    const handleLogout = () => {
        auth?.setAuth({
            email: undefined,
            accessToken: undefined,
        })

        navigation(from, {replace: true});
    }

    return (
        <>
            {auth?.auth?.email ?

                <div className={"flex gap-[8px] items-center cursor-pointer"}
                    onClick={handleLogout}>
                    <img src={userSVG} className={"w-[20px] h-[20px]"} alt={'user svg icon'}/>

                    {width >= Breakpoints.LARGE ?
                        <span>Logout</span>
                        : ''}

                </div>

                :

                <Link to={LOGIN}>
                    <div className={"flex gap-[8px] items-center"}>
                        <img src={userSVG} className={"w-[20px] h-[20px]"} alt={'user svg icon'}/>

                        {width >= Breakpoints.LARGE ?
                            <span>Login</span>
                            : ''}

                    </div>
                </Link>
            }
        </>
    )
}