import {RegisterForm} from "./RegisterForm.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {AuthFormHolder} from "./AuthFormHolder.tsx";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {Header2ParagraphSmall} from "../reusable/Header2ParagraphSmall.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const Register = () => {
    const viewport = useViewport();

    useScrollToTop();


    return (
        <AuthFormHolder>

            {viewport >= Breakpoints.LARGE ?
                < ElectronLogoHero/>
                :
                <></>
            }

            <Header2ParagraphSmall header="Register your account" paragraph="One of the most liked e-shops"/>
            <RegisterForm/>

        </AuthFormHolder>
    )
}