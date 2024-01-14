import {UserSvg} from "../../assets/icons/UserSvg.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../constants/Routes.ts";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {AccountFunctions} from "./AccountFunctions.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";

export const Account = () => {
    const width = useViewport();
    const auth = useAuth();

    const navigation = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || HOME_ROUTE;


    const handleLogout = () => {
        auth?.setAuth({})
        navigation(from, {replace: true});
    }

    return (
        <>
            {auth?.auth?.token ?


                <AccountFunctions/>
                // <div className={"flex gap-[8px] items-center cursor-pointer"}
                //     onClick={handleLogout}>
                //     <img src={userSVG} className={"w-[20px] h-[20px]"} alt={'user svg icon'}/>
                //     {width >= Breakpoints.LARGE ? <span>Logout</span> : ''}
                // </div>

                :

                <Link to={LOGIN_ROUTE}>
                    <div className={"flex gap-[8px] items-center"}>
                        <SmallSvgIcon>
                            <UserSvg/>
                        </SmallSvgIcon>
                        {width >= Breakpoints.LARGE ? <span>Login</span> : ''}
                    </div>
                </Link>
            }
        </>
    )
}