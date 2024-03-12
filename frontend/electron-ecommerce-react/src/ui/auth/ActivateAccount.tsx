import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {ACTIVATE_API_PATH, axiosRegistration} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";
import {useErrorNotification} from "../../custom_hooks/useErrorNotification.ts";

export const ActivateAccount = () => {
    const params = useParams();
    const activationToken = params.token;
    const messageScreen = useMessageScreen();
    const errorNotification = useErrorNotification();

    useScrollToTop();

    useEffect(() => {
        axiosRegistration.patch(ACTIVATE_API_PATH + "/" +  activationToken)
            .then((result) => {
                messageScreen(result.data.message)
            })
            .catch(() => {
                errorNotification('Ups...');
            })

    })


    return (
        <>
        </>
    )
}