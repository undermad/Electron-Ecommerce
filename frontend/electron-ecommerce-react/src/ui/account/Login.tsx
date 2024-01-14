import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {HOME_ROUTE, REGISTER_ROUTE} from "../../constants/Routes.ts";
import {LoginRequest} from "../../api/dto/LoginRequest.ts";
import {LoginResponse} from "../../api/dto/LoginResponse.ts";
import {axiosAuth} from "../../api/axios.ts";
import {LOGIN_API_PATH} from "../../constants/ApiEndpointsPaths.ts";
import {AxiosResponse} from "axios";
import {HoverScale} from "../reusable/HoverScale.tsx";
import {Header2} from "../reusable/Header2.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Label} from "../reusable/Label.tsx";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";


export const Login = () => {
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
        <section
            className={"px-responsive-electron w-full max-w-[1440px] flex justify-center mt-[16px] font-inter"}>

            <div className={"w-[706px] h-[1024px] flex justify-center"}>
                <div className={"w-[355px] mt-16"}>

                    <ElectronLogoHero/>

                    <Header2>Login to your account</Header2>
                    <ParagraphSmall>You are always very welcome!</ParagraphSmall>

                    <p ref={errorRef}
                       className={errorMessage ? "text-electron-error text-xl" : ""}>
                        {errorMessage}
                    </p>

                    <form
                        className={"mt-[35px] flex flex-col"}
                        onSubmit={handleSubmit}>

                        <div className={"flex flex-col gap-[16px]"}>
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
                                />
                                <div className={"flex"}>
                                    <LabelCheckboxHolder tailwind="w-1/2">
                                        <input type={"checkbox"}
                                               id={"persist"}
                                               onChange={togglePersist}/>
                                        <CheckboxLabel htmlFor={"persist"}>Remember me?</CheckboxLabel>
                                    </LabelCheckboxHolder>
                                    <ParagraphSmall tailwind="font-[400] text-right">Forgot Password?</ParagraphSmall>
                                </div>
                            </LabelInputHolder>

                        </div>

                        <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                            <button
                                className={loading ? "button-electron-disabled" : "button-electron"}
                                disabled={loading}>
                                Log In
                            </button>
                        </div>

                    </form>

                    <ParagraphSmall tailwind="flex justify-center mt-3">
                        Don't have an account?&nbsp;
                        <HoverScale>
                            <Link to={REGISTER_ROUTE}>
                                <span className={"font-[600]"}>Register</span>
                            </Link>
                        </HoverScale>
                    </ParagraphSmall>

                </div>

            </div>
        </section>

    )


}

