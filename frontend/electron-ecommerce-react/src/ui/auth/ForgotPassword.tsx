import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {ForgotPasswordForm} from "./ForgotPasswordForm.tsx";
import {AuthFormHolder} from "./AuthFormHolder.tsx";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Header2ParagraphSmall} from "../reusable/Header2ParagraphSmall.tsx";

export const ForgotPassword = () => {
    const viewport = useViewport();

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