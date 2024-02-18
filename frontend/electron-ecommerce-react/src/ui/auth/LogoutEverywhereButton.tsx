import {useAuth} from "../../custom_hooks/useAuth.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {LOGOUT_EVERYWHERE_SUCCESSFUL} from "../../constants/Messages.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {AUTH_API_PATH, LOGOUT_EVERYWHERE} from "../../api/axios.ts";
import {Span} from "../reusable/Span.tsx";

const LogoutEverywhereButton = () => {

    const auth = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const messageScreen = useMessageScreen();

    const handleLogoutEverywhere = () => {

        axiosPrivate.post(AUTH_API_PATH + LOGOUT_EVERYWHERE)
            .then((response) => {
                console.log(response.data);
                auth?.setAuth({});
                messageScreen(LOGOUT_EVERYWHERE_SUCCESSFUL)
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className="cursor-pointer" onClick={handleLogoutEverywhere}>
            <Span>Logout all devices</Span>
        </div>
    )
}

export default LogoutEverywhereButton;