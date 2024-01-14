import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {Header2} from "../reusable/Header2.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";

export const Register = () => {


    return (
        <section
            className={"px-responsive-electron w-full max-w-[1440px] flex justify-center mt-[16px] font-inter"}>

            <div className={"w-[706px] h-[1024px] flex justify-center"}>
                <div className={"w-[355px] mt-16"}>

                    <ElectronLogoHero/>

                    <Header2>Register your account</Header2>
                    <ParagraphSmall>Stay with us forever!</ParagraphSmall>


                    <form className={"mt-[35px] flex flex-col"}>

                        <div className={"flex flex-col gap-[16px]"}>
                            <LabelInputHolder>
                                <Label htmlFor={"name"}>First name</Label>
                                <input
                                    className={"input-electron"}
                                    id={"name"}
                                    type={"text"}
                                    required={true}
                                />
                            </LabelInputHolder>
                            <LabelInputHolder>
                                <Label htmlFor={"name"}>Last name</Label>
                                <input
                                    className={"input-electron"}
                                    id={"name"}
                                    type={"text"}
                                    required={true}
                                />
                            </LabelInputHolder>
                            <LabelInputHolder>
                                <Label htmlFor={"email"}>Email Address</Label>
                                <input
                                    className={"input-electron"}
                                    id={"email"}
                                    type={"text"}
                                    required={true}
                                />
                            </LabelInputHolder>

                            <LabelInputHolder>
                                <Label htmlFor={"password"}>Password</Label>
                                <input
                                    className={"input-electron"}
                                    id={"password"}
                                    type={"password"}
                                    placeholder={"At least six characters"}
                                    required={true}
                                />
                            </LabelInputHolder>
                            <LabelInputHolder>
                                <Label htmlFor={"re-enter-password"}>Re-enter password</Label>
                                <input
                                    className={"input-electron"}
                                    id={"re-enter-password"}
                                    type={"password"}
                                    required={true}
                                />
                            </LabelInputHolder>
                            <LabelCheckboxHolder>
                                <input type={"checkbox"}
                                       id={"persist"}/>
                                <CheckboxLabel htmlFor={"persist"}>Would you like to sign for the newsletter?</CheckboxLabel>
                            </LabelCheckboxHolder>
                        </div>



                        <div className={"flex flex-col gap-[14px] mt-[24px]"}>
                            <button className={"button-electron"}>
                                Register
                            </button>
                        </div>

                    </form>



                </div>

            </div>
        </section>

    )
}