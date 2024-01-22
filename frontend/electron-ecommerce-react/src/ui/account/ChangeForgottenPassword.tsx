import {ChangeForgottenPasswordForm} from "./ChangeForgottenPasswordForm.tsx";
import {AuthFormHolder} from "./AuthFormHolder.tsx";
import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Header2ParagraphSmall} from "../reusable/Header2ParagraphSmall.tsx";

export const ChangeForgottenPassword = () => {
    const viewport = useViewport();


    return (
        <AuthFormHolder>
            {
                viewport >= Breakpoints.LARGE ?
                    //DESKTOP
                    <>
                        <ElectronLogoHero/>
                        <Header2ParagraphSmall header="Change your password" paragraph="Never give your password to anyone"/>
                        <ChangeForgottenPasswordForm/>
                    </>

                    :

                    //MOBILE
                    <>
                        <Header2ParagraphSmall header="Change your password" paragraph="Never give your password to anyone"/>
                        <ChangeForgottenPasswordForm/>
                    </>
            }
        </AuthFormHolder>
    )
}