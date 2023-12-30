import {ElectronLogo} from "../nav/ElectronLogo.tsx";

export const Account = () => {
    return (
        <section className={"px-responsive-electron w-full max-w-[1440px] flex justify-center mt-[16px] font-inter"}>


            <div className={"w-[706px] h-[1024px] flex justify-center"}>
                <div className={"w-[355px] my-auto"}>

                    <div className={"relative"}>
                        <div className={"scale-[2] mb-[200px]"}>
                            <ElectronLogo dark={true}/>
                        </div>
                        <p className={"tracking-wider text-electron-primary-dark-blue absolute top-3/4 left-1/2 translate-y-3/4 -translate-x-1/2 text-center text-[14px] font-[400]"}>
                            A TECH SOLUTION FOR EVERY DEVICE
                        </p>
                    </div>
                    <span
                        className={"text-electron-primary-dark-blue text-[24px] font-[600]"}>
                        Login to your account</span>
                    <p className={"text-[12px] w-full align-middle text-electron-input-ash-blue"}>
                        You are always very welcome!
                    </p>

                    <form className={"mt-[35px] flex flex-col"}>
                        <div className={"flex flex-col gap-[16px]"}>
                            <div className={"flex flex-col gap-[6px]"}>
                                <label className={"text-[14px] text-electron-label-grey leading-5 font-[500]"}>
                                    Email Address
                                </label>
                                <input
                                    className={"border rounded-[8px] border-electron-input-grey px-[14px] py-[10px] shadow-md focus:outline-0 placeholder:text-electron-placeholder-grey"}
                                    placeholder={"Enter your email address"}
                                    type={"text"}
                                    id={"email"}/>
                            </div>
                            <div className={"flex flex-col gap-[6px]"}>
                                <label
                                    className={"text-[14px] text-electron-label-grey leading-5 font-[500]"}>Password</label>
                                <input
                                    className={"border rounded-[8px] border-electron-input-grey px-[14px] py-[10px] shadow-md focus:outline-0 placeholder:text-electron-placeholder-grey"}
                                    type={"password"}
                                    placeholder={"Enter your password"}
                                    id={"email"}/>
                                <p className={"text-[12px] font-[400] leading-5 text-right w-full align-middle text-electron-input-ash-blue"}>Forgot
                                    Password?</p>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                            <button
                                className={"h-[48px] p-[14px] text-electron-primary-white rounded-full bg-electron-primary-dark-blue shadow-md"}>Log
                                In
                            </button>
                            <p className={"flex justify-center text-[12px] w-full align-middle text-electron-input-ash-blue"}>
                                <span>Don't have an account?&nbsp;</span>
                                <span className={"font-[600]"}>Register</span>
                            </p>
                        </div>

                    </form>

                </div>


            </div>


        </section>


    )


}

