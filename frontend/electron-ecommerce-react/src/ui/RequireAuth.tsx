import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../custom_hooks/useAuth.ts";
import {LOGIN_ROUTE, UNAUTHORIZED_ROUTE} from "../constants/Routes.ts";

interface RequireAuthProps {
    allowedRoles: string[],
}

export const RequireAuth = (props: RequireAuthProps) => {
    const auth = useAuth();
    const location = useLocation();

    return (
        auth?.auth?.roles?.find((role) => props.allowedRoles.includes(role))
            ?
            <Outlet/>
            :
            //change ternary subject
            auth?.auth?.token ?
                <Navigate to={UNAUTHORIZED_ROUTE} state={{from: location}} replace/>
                :
                <Navigate to={LOGIN_ROUTE} state={{from: location}} replace/>
    )
}