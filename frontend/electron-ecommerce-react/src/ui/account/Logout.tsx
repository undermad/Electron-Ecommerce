import {useLogout} from "../../custom_hooks/useLogout.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../constants/Routes.ts";

export const Logout = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    useEffect(() => {
        console.log('Effect executed');
        logout();
        navigate(HOME_ROUTE);
    },[])

    return (
        <></>
    )
}