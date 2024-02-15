import {useAuth} from "../custom_hooks/useAuth.ts";
import useRefreshToken from "../custom_hooks/useRefreshToken.ts";
import {useEffect, useState} from "react";
import {Loading} from "./global/Loading.tsx";
import {Outlet} from "react-router-dom";
import {useFetchBasket} from "../custom_hooks/useFetchBasket.ts";

export const PersistLogin = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useAuth();
    const refresh = useRefreshToken({redirectToLogin: false});
    const fetchBasket = useFetchBasket();

    useEffect(() => {
        const verifyToken = async () => {
            await refresh()
                .catch(() => {
                    setLoading(false)
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        !auth?.auth?.token ? verifyToken() : setLoading(false);
    }, []);

    useEffect(() => {
        fetchBasket()
            .then(() => console.log('finitp'));
    }, [auth?.auth?.token]);


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