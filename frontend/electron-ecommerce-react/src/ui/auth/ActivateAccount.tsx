import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {ACTIVATE_API_PATH, axiosRegistration} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const ActivateAccount = () => {
    const params = useParams();
    const activationToken = params.token;
    const messageScreen = useMessageScreen();

    useScrollToTop();

    useEffect(() => {
        axiosRegistration.patch(ACTIVATE_API_PATH + "/" +  activationToken)
            .then((result) => {
                console.log(result);
                messageScreen(result.data.message)
            })
            .catch((error) => {
                console.log(error);
            })

    })


    return (
        <>
        </>
    )
}