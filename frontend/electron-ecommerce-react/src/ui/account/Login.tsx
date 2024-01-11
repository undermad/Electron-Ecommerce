import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {useNavigate, useLocation} from "react-router-dom";
import {HOME_ROUTE} from "../../constants/Routes.ts";
import {LoginRequest} from "../../api/dto/LoginRequest.ts";
import {LoginResponse} from "../../api/dto/LoginResponse.ts";
import {axiosAuth} from "../../api/axios.ts";
import {LOGIN_API_PATH} from "../../constants/ApiEndpointsPaths.ts";
import {AxiosResponse} from "axios";


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

                    <span
                        className={"text-electron-primary-dark-blue text-[24px] font-[600]"}>
                        Login to your account</span>
                    <p className={"text-[12px] w-full align-middle text-electron-input-ash-blue"}>
                        You are always very welcome!
                    </p>

                    <p ref={errorRef}
                       className={errorMessage ? "text-electron-error text-xl" : ""}>{errorMessage}</p>

                    <form
                        className={"mt-[35px] flex flex-col"}
                        onSubmit={handleSubmit}>

                        <div className={"flex flex-col gap-[16px]"}>
                            <div className={"flex flex-col gap-[6px]"}>
                                <p className={"text-[14px] text-electron-label-grey leading-5 font-[500]"}>
                                    Email Address
                                </p>
                                <input
                                    className={"focus:ring-1 border rounded-[8px] border-electron-input-grey px-[14px] py-[10px] shadow-md focus:outline-0 placeholder:text-electron-placeholder-grey"}
                                    id={"email"}
                                    type={"text"}
                                    placeholder={"Enter your email address"}
                                    ref={emailRef}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required={true}
                                />
                            </div>

                            <div className={"flex flex-col gap-[6px]"}>
                                <p className={"input-label-electron"}>
                                    Password
                                </p>
                                <input className={"input-electron"}
                                       id={"password"}
                                       type={"password"}
                                       ref={passwordRef}
                                       placeholder={"Enter your password"}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className={"flex"}>
                                    <div className={"flex w-1/2 gap-1"}>
                                        <input
                                            type={"checkbox"}
                                            id={"checked"}
                                            onChange={togglePersist}
                                        />
                                        <label id={"persist"} className={"text-[12px] font-[400] leading-5"}>Remember
                                            me?</label>
                                    </div>
                                    <p className={"text-[12px] font-[400] leading-5 text-right w-1/2 align-middle text-electron-input-ash-blue"}>
                                        Forgot Password?</p>
                                </div>
                            </div>
                        </div>

                        <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                            <button
                                className={loading ? "button-electron-disabled" : "button-electron"}
                                disabled={loading}>
                                Log In
                            </button>
                        </div>

                    </form>

                    <p className={"flex justify-center text-[12px] w-full align-middle text-electron-input-ash-blue mt-3"}>
                        <span>Don't have an account?&nbsp;</span>
                        <span className={"font-[600]"}>Register</span>
                    </p>

                </div>

            </div>
        </section>

    )


}

