import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {FORGOT_PASSWORD, HOME_ROUTE, REGISTER_ROUTE} from "../../constants/Routes.ts";
import {LoginRequest} from "../../api/dto/LoginRequest.ts";
import {LoginResponse} from "../../api/dto/LoginResponse.ts";
import {axiosAuth, LOGIN_API_PATH} from "../../api/axios.ts";
import {AxiosResponse} from "axios";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Label} from "../reusable/Label.tsx";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";

export const LoginForm = () => {
    const auth = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || HOME_ROUTE;


    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(false);


    useEffect(() => {
        if (emailRef.current !== null) {
            emailRef.current.focus()
        }
    }, [])


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new LoginRequest(email, password);

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
                setErrorMessage(error?.response?.data?.message);
            })

        if (errorRef.current !== null)
            errorRef.current.focus();

    }

    const togglePersist = () => {
        setRemember(!remember);
    }


    return (


        <form
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>

            <p ref={errorRef}
               className={errorMessage ? "text-electron-error text-xl" : ""}>
                {errorMessage}
            </p>
            <MultiInputHolder>
                <LabelInputHolder>
                    <Label htmlFor={"email"}>Email Address</Label>
                    <input
                        className={"input-electron"}
                        id={"email"}
                        type={"text"}
                        placeholder={"Enter your email address"}
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required={true}
                        autoComplete={"email"}
                    />
                </LabelInputHolder>

                <LabelInputHolder>
                    <Label htmlFor={"password"}>Password</Label>
                    <input
                        className={"input-electron"}
                        id={"password"}
                        type={"password"}
                        ref={passwordRef}
                        placeholder={"Enter your password"}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={"password"}
                    />
                    <div className={"flex"}>
                        <LabelCheckboxHolder tailwind="w-1/2">
                            <input type={"checkbox"}
                                   id={"persist"}
                                   onChange={togglePersist}
                                   autoComplete={"off"}
                            />
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
            <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                <button
                    className={loading ? "button-electron-disabled" : "button-electron"}
                    disabled={loading}>
                    Log In
                </button>
            </div>

            <ParagraphSmall tailwind="flex justify-center mt-3">
                Don't have an account?&nbsp;
                <Link to={REGISTER_ROUTE}>
                    <span className={"font-[600]"}>Register</span>
                </Link>
            </ParagraphSmall>

        </form>


    )


}

