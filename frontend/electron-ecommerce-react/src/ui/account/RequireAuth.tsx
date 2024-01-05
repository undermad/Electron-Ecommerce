import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../custom_hooks/useAuth.ts";
import {LOGIN} from "../../constants/Routes.ts";

export const RequireAuth = () => {
    const auth = useAuth();
    const location = useLocation();

    return (
        auth?.auth?.email ?
            <Outlet/>
            :
            <Navigate to={LOGIN} state={{from: location}} replace />
    )
}