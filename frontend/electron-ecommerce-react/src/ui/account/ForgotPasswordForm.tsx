import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import React, {useRef, useState} from "react";
import {PasswordRecoveryRequest} from "../../api/dto/PasswordRecoveryRequest.ts";
import {axiosAuth, FORGOT_PASSWORD_API_PATH} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {TextInput} from "../reusable/TextInput.tsx";
import {FormSubmitButton} from "../reusable/FormSubmitButton.tsx";
import useFocusOnMount from "../../custom_hooks/useFocusOnMount.ts";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageScreen = useMessageScreen();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new PasswordRecoveryRequest(email);
        axiosAuth.post(FORGOT_PASSWORD_API_PATH, data)
            .then((response) => {
                messageScreen(response.data.message);
            })
            .catch((error) => {
                messageScreen(error.data.message);
            })

    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    useFocusOnMount(emailRef);

    return (
        <form
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>
            <LabelInputHolder>
                <LabelInputHolder>
                    <Label htmlFor="email">Email address</Label>
                    <TextInput id={"email"}
                               inputRef={emailRef}
                               type={"text"}
                               placeholder={"Enter your email address"}
                               callback={handleEmailChange}/>
                </LabelInputHolder>
            </LabelInputHolder>

            <FormSubmitButton loading={loading}/>
        </form>
    )
}