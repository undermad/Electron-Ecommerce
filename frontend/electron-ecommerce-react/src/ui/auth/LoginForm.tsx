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
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {SpanWeightSix} from "../reusable/SpanWeightSix.tsx";
import {FormErrorMessage} from "../reusable/FormErrorMessage.tsx";
import useFocusOnMount from "../../custom_hooks/useFocusOnMount.ts";
import {LoginRequest, LoginRequestError} from "../../api/dto/auth/LoginRequest.ts";
import {Bold} from "../reusable/Bold.tsx";

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
                auth?.setAuth({...response.data});
                navigate(from, {replace: true});
            })
            .catch(error => {
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
            id="loginForm"
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>

            <FormErrorMessage errorMessage={loginRequestError.message}/>
            <MultiInputHolder>
                <div className="flex flex-col gap-2">

                    <Bold weight={600} textSize={18}>Test user credentials</Bold>
                    <div className="flex gap-1">
                        <Bold weight={600} textSize={18}>Email Address: </Bold>
                        <p className="text-[18px]"> user@test.com</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Bold weight={600} textSize={18}>Password: </Bold>
                        <p className="text-[18px]"> AmazingTestUser123</p>
                    </div>
                </div>
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
            <ElectronButton form="loginForm" loading={loading}>Log In</ElectronButton>

            <ParagraphSmall tailwind="flex justify-center mt-3">
                Don't have an account?&nbsp;
                <Link to={REGISTER_ROUTE}>
                    <SpanWeightSix>Register</SpanWeightSix>
                </Link>
            </ParagraphSmall>

        </form>


    )


}

