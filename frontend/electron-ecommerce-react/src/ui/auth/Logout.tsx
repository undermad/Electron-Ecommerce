import {useLogout} from "../../custom_hooks/useLogout.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../constants/Routes.ts";
import {useErrorNotification} from "../../custom_hooks/useErrorNotification.ts";

export const Logout = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    const errorNotification = useErrorNotification();
    useEffect(() => {
        logout()
            .catch(() => errorNotification('Ups...'));
        navigate(HOME_ROUTE);
    }, [])

    return (
        <></>
    )
}