import {useAuth} from "../custom_hooks/useAuth.ts";
import {useRefreshToken} from "../custom_hooks/useRefreshToken.ts";
import {useEffect, useState} from "react";
import {Loading} from "./global/Loading.tsx";
import {Outlet} from "react-router-dom";

export const PersistLogin = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useAuth();
    const refresh = useRefreshToken({redirectToLogin: false});

    useEffect(() => {
        const verifyToken = async () => {
            await refresh()
                .catch(error => {
                    setLoading(false)
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        !auth?.auth?.token ? verifyToken() : setLoading(false);
    }, []);


    return (
        <>
            {loading ?
                <Loading/>
                :
                <Outlet/>
            }
        </>
    )

}