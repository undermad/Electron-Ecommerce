import {UserSvg} from "../../assets/icons/UserSvg.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE} from "../../constants/Routes.ts";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {AccountFunctions} from "./AccountFunctions.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";
import {HoverScale} from "../reusable/HoverScale.tsx";

export const AccountLink = () => {
    const width = useViewport();
    const auth = useAuth();

    return (
        <>
            {auth?.auth?.token ?

                <AccountFunctions/>
                :
                <HoverScale>
                    <Link to={LOGIN_ROUTE}>
                        <div className={"flex gap-[8px] items-center"}>
                            <SmallSvgIcon>
                                <UserSvg/>
                            </SmallSvgIcon>
                            {width >= Breakpoints.LARGE ? <span>Login</span> : ''}
                        </div>
                    </Link>
                </HoverScale>
            }
        </>
    )
}