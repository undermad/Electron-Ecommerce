import {AUTH_API_PATH, LOGOUT_EVERYWHERE} from "../../constants/ApiEndpointsPaths.ts";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {MESSAGE_SCREEN_ROUTE} from "../../constants/Routes.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {useContext} from "react";
import {MessageScreenContext} from "../../context/MessageScreenContext.tsx";
import {LOGOUT_EVERYWHERE_SUCCESSFUL} from "../../constants/Messages.ts";

const LogoutEverywhereButton = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const messageCtx = useContext(MessageScreenContext);

    const handleLogoutEverywhere = () => {

        axiosPrivate.post(AUTH_API_PATH + LOGOUT_EVERYWHERE)
            .then((response) => {
                console.log(response.data);
                auth?.setAuth({});
                messageCtx?.setMessage(LOGOUT_EVERYWHERE_SUCCESSFUL)
                navigate(MESSAGE_SCREEN_ROUTE)
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <button onClick={handleLogoutEverywhere}>Logout all devices</button>
    )
}

export default LogoutEverywhereButton;