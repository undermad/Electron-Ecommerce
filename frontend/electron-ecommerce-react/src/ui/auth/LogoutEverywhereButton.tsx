import {useAuth} from "../../custom_hooks/useAuth.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {LOGOUT_EVERYWHERE_SUCCESSFUL} from "../../constants/Messages.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {AUTH_API_PATH, LOGOUT_EVERYWHERE} from "../../api/axios.ts";
import {Span} from "../reusable/Span.tsx";
import {useErrorNotification} from "../../custom_hooks/useErrorNotification.ts";

const LogoutEverywhereButton = () => {

    const auth = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const messageScreen = useMessageScreen();
    const errorNotification = useErrorNotification();

    const handleLogoutEverywhere = () => {

        axiosPrivate.post(AUTH_API_PATH + LOGOUT_EVERYWHERE)
            .then(() => {
                auth?.setAuth({});
                messageScreen(LOGOUT_EVERYWHERE_SUCCESSFUL)
            })
            .catch(() => {
                errorNotification('Ups...')
            })

    }

    return (
        <div className="cursor-pointer" onClick={handleLogoutEverywhere}>
            <Span>Logout from all devices</Span>
        </div>
    )
}

export default LogoutEverywhereButton;