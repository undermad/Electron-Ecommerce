import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {Header2} from "../reusable/Header2.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {ForgotPasswordStageOne} from "./ForgotPasswordStageOne.tsx";

export const ForgotPassword = () => {


    return (
        <section className={"px-responsive-electron w-full max-w-[1440px] flex justify-center mt-[16px] font-inter"}>
            <div className={"h-[1024px]"}>
                <div className={"w-[355px] mt-16"}>


                    <ElectronLogoHero/>
                    <Header2>Password recovery</Header2>
                    <ParagraphSmall>Our support is here to help you</ParagraphSmall>

                    <ForgotPasswordStageOne/>


                </div>
            </div>
        </section>
    )

}