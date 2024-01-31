import React, {SyntheticEvent, useRef, useState} from "react";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {FORGOT_PASSWORD, HOME_ROUTE, REGISTER_ROUTE} from "../../constants/Routes.ts";
import {LoginResponse} from "../../api/dto/auth/LoginResponse.ts";
import {axiosAuth, LOGIN_API_PATH} from "../../api/axios.ts";
import {AxiosResponse} from "axios";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Label} from "../reusable/Label.tsx";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import {ToggleCheckbox} from "../reusable/ToggleCheckbox.tsx";
import {FormSubmitButton} from "../reusable/FormSubmitButton.tsx";
import {SpanWeightSix} from "../reusable/SpanWeightSix.tsx";
import {FormErrorMessage} from "../reusable/FormErrorMessage.tsx";
import useFocusOnMount from "../../custom_hooks/useFocusOnMount.ts";
import {LoginRequest, LoginRequestError} from "../../api/dto/auth/LoginRequest.ts";

export const LoginForm = () => {
    const auth = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || HOME_ROUTE;

    const emailRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginRequestError, setLoginRequestError] = useState<LoginRequestError>({
        email: '',
        password: '',
        message: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        const data: LoginRequest = {email: email, password: password};

        axiosAuth.post(LOGIN_API_PATH, data, {
            params: {remember: remember}
        })
            .then((response: AxiosResponse<LoginResponse>) => {
                console.log(response.data);
                auth?.setAuth({...response.data});
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.log(error?.response?.data);
                setLoading(false);
                setLoginRequestError({...error?.response?.data});
            })


    }

    const togglePersist = () => {
        setRemember(!remember);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    useFocusOnMount(emailRef);

    return (


        <form
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>

            <FormErrorMessage errorMessage={loginRequestError.message}/>
            <MultiInputHolder>
                <LabelInputHolder>
                    <Label errorMessage={loginRequestError.email} htmlFor={"email"}>Email Address</Label>
                    <TextInput callback={handleEmailChange}
                               id={"email"}
                               type={"text"}
                               placeholder={"Enter your email address"}
                               inputRef={emailRef}
                               value={email}
                               required={true}
                               autoComplete={"email"}/>
                </LabelInputHolder>

                <LabelInputHolder>
                    <Label errorMessage={loginRequestError.password} htmlFor={"password"}>Password</Label>
                    <TextInput
                        id={"password"}
                        type={"password"}
                        placeholder={"Enter your password"}
                        callback={handlePasswordChange}
                        autoComplete={"password"}/>
                    <div className={"flex"}>
                        <LabelCheckboxHolder tailwind="w-1/2">
                            <ToggleCheckbox type={"checkbox"}
                                            id={"persist"}
                                            autoComplete={"off"}
                                            callback={togglePersist}/>
                            <CheckboxLabel htmlFor={"persist"}>Remember me?</CheckboxLabel>
                        </LabelCheckboxHolder>
                        <ParagraphSmall tailwind="font-[400] text-right">
                            <Link to={FORGOT_PASSWORD}>
                                Forgot Password?
                            </Link>
                        </ParagraphSmall>
                    </div>
                </LabelInputHolder>
            </MultiInputHolder>
            <FormSubmitButton loading={loading}/>

            <ParagraphSmall tailwind="flex justify-center mt-3">
                Don't have an account?&nbsp;
                <Link to={REGISTER_ROUTE}>
                    <SpanWeightSix>Register</SpanWeightSix>
                </Link>
            </ParagraphSmall>

        </form>


    )


}

