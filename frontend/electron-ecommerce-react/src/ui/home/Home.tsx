import {useViewport} from "../custom_hooks/useViewport.ts";
import {Breakpoints} from "../custom_hooks/Breakpoints.ts";
import {Hero} from "./Hero.tsx";

export const Home = () => {

    const width = useViewport();


    return (

        <section className={"px-responsive-electron w-full max-w-[1440px] "}>

            {width >= Breakpoints.SMALL ?
                <Hero/>
                : ""}

        </section>
    )
}