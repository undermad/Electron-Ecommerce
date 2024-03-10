import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {ACCOUNT_ROUTE, ADDRESSES_NESTED_ROUTE} from "../../constants/Routes.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {ADDRESS_API_PATH, DELETE} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {OPERATION_FAILED} from "../../constants/Messages.ts";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const DeleteAddress = () => {

    const param = useParams();
    const addressId = param.addressId;
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const messageScreen = useMessageScreen();

    useScrollToTop();

    useEffect(() => {
        axiosPrivate.delete(ADDRESS_API_PATH + DELETE + "/" + addressId)
            .then(() => {
                navigate(ACCOUNT_ROUTE + "/" + ADDRESSES_NESTED_ROUTE)
            })
            .catch(() => {
                messageScreen(OPERATION_FAILED);
            })
    }, []);


    return (
        <>
        </>
    )
}