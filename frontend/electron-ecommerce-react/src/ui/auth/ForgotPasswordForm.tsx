import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import React, {useRef, useState} from "react";
import {PasswordRecoveryRequest, PasswordRecoveryRequestError} from "../../api/dto/auth/PasswordRecoveryRequest.ts";
import {axiosAuth, FORGOT_PASSWORD_API_PATH} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {TextInput} from "../reusable/TextInput.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import useFocusOnMount from "../../custom_hooks/useFocusOnMount.ts";
import {FormErrorMessage} from "../reusable/FormErrorMessage.tsx";
import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";


export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageScreen = useMessageScreen();
    const [validationError, setValidationError] = useState<PasswordRecoveryRequestError>({
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data: PasswordRecoveryRequest = {email: email}
        axiosAuth.post(FORGOT_PASSWORD_API_PATH, data)
            .then((response) => {
                messageScreen(response.data.message);
            })
            .catch((error) => {
                console.log(error)
                setValidationError({...error?.response?.data})
                setLoading(false);
            })

    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    useFocusOnMount(emailRef);

    return (
        <form
            id="forgottenPassword"
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>

            <FormErrorMessage errorMessage={validationError.message}/>
            <MultiInputHolder>
                <LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.email} htmlFor="email">Email address</Label>
                        <TextInput id={"email"}
                                   inputRef={emailRef}
                                   type={"text"}
                                   placeholder={"Enter your email address"}
                                   callback={handleEmailChange}/>
                    </LabelInputHolder>
                </LabelInputHolder>
            </MultiInputHolder>

            <ElectronButton form="forgottenPassword" loading={loading}>Submit</ElectronButton>
        </form>
    )
}