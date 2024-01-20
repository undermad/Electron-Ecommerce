import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {ACTIVATE_API_PATH, axiosRegistration} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";

export const ActivateAccount = () => {
    const params = useParams();
    const activationToken = params.token;
    const messageScreen = useMessageScreen();

    useEffect(() => {

        axiosRegistration.patch(ACTIVATE_API_PATH + "/" +  activationToken)
            .then((result) => {
                console.log(result);
                messageScreen("activated")
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