import {SyntheticEvent, useContext, useEffect, useRef, useState} from "react";
import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {Auth, AuthContext} from "../context/AuthContext.tsx";
import axios from "../../api/Axios.ts";
import {AUTH, BASE_API_URL, LOGIN} from "../../constants/ApiPaths.tsx";
import {AxiosError} from "axios";


export const Account = () => {
    const auth = useContext(AuthContext);
    const userRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (userRef.current !== null) {
            userRef.current.focus()
        }
    }, [])

    useEffect(() => {

    }, [email, password]);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                BASE_API_URL + AUTH + LOGIN,
                JSON.stringify({
                    email: email,
                    password: password
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false
                }
            );
            // console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));

            let user: Auth = {
                email: email,
                accessToken: response?.data?.accessToken
            }

            auth?.setAuth(user);

            setEmail('');
            setPassword('');
            setSuccess(true);

        } catch (err: Error | AxiosError) {
            if (!err?.response) {
                setErrorMessage("No server response");
            } else if (err.response?.status === 400) {
                setErrorMessage("Error 400")
            } else if (err.response?.status === 401) {
                setErrorMessage("Error 401")
            }else if (err.response?.status == 500){
                setErrorMessage(err.response?.data.message)
                console.log(err)
            }
            else {
                setErrorMessage("Login Failed");
            }
        }
        if (errorRef.current !== null)
            errorRef.current.focus();
    }

    return (
        <>
            {success ?
                <section>
                    <div><p>You are already logged in!</p></div>
                </section>

                :
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


                            <p ref={errorRef} className={errorMessage ? "text-electron-error text-xl" : ""}>{errorMessage}</p>

                            <form
                                className={"mt-[35px] flex flex-col"}
                                onSubmit={handleSubmit}>

                                <div className={"flex flex-col gap-[16px]"}>
                                    <div className={"flex flex-col gap-[6px]"}>
                                        <label className={"text-[14px] text-electron-label-grey leading-5 font-[500]"}>
                                            Email Address
                                        </label>
                                        <input
                                            className={"focus:ring-1 border rounded-[8px] border-electron-input-grey px-[14px] py-[10px] shadow-md focus:outline-0 placeholder:text-electron-placeholder-grey"}
                                            id={"email"}
                                            type={"text"}
                                            placeholder={"Enter your email address"}
                                            ref={userRef}
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required={true}
                                        />
                                    </div>

                                    <div className={"flex flex-col gap-[6px]"}>
                                        <label
                                            className={"text-[14px] text-electron-label-grey leading-5 font-[500]"}>Password</label>
                                        <input
                                            className={"focus:ring-1 border rounded-[8px] border-electron-input-grey px-[14px] py-[10px] shadow-md focus:outline-0 placeholder:text-electron-placeholder-grey"}
                                            id={"password"}
                                            type={"password"}
                                            placeholder={"Enter your password"}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <p className={"text-[12px] font-[400] leading-5 text-right w-full align-middle text-electron-input-ash-blue"}>
                                            Forgot Password?</p>
                                    </div>
                                </div>

                                <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                                    <button
                                        className={"h-[48px] p-[14px] text-electron-primary-white rounded-full bg-electron-primary-dark-blue shadow-md"}>Log
                                        In
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

            }
        </>
    )


}

