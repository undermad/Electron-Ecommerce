import {LoginForm} from "./LoginForm.tsx";
import {AuthFormHolder} from "./AuthFormHolder.tsx";
import {ElectronLogoHero} from "./ElectronLogoHero.tsx";
import {Header2ParagraphSmall} from "../reusable/Header2ParagraphSmall.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const Login = () => {
    const viewport = useViewport();

    useScrollToTop();

    return (
        <AuthFormHolder>

            {viewport >= Breakpoints.LARGE ?
                < ElectronLogoHero/>
                :
                <></>
            }

            <Header2ParagraphSmall header="Login to your account" paragraph="You are always welcome here!"/>
            <LoginForm/>

        </AuthFormHolder>
    )
}