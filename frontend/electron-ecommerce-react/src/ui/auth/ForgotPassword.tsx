import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {ForgotPasswordForm} from "./ForgotPasswordForm.tsx";
import {AuthFormHolder} from "./AuthFormHolder.tsx";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Header2ParagraphSmall} from "../reusable/Header2ParagraphSmall.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const ForgotPassword = () => {
    const viewport = useViewport();

    useScrollToTop();


    return (
        <AuthFormHolder>
            {viewport >= Breakpoints.LARGE ?
                < ElectronLogoHero/>
                :
                <></>
            }
            <Header2ParagraphSmall header="Password recovery" paragraph="Our support is here to help you"/>
            <ForgotPasswordForm/>
        </AuthFormHolder>
    )

}