import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../custom_hooks/Breakpoints.ts";
import {Hero} from "./Hero.tsx";
import {Link} from "react-router-dom";
import {ADMIN} from "../../constants/Routes.ts";

export const Home = () => {

    const width = useViewport();

    return (

        <section className={"px-responsive-electron w-full max-w-[1440px] "}>
            <Link to={ADMIN}>Admin Section Click</Link>

            {width >= Breakpoints.SMALL ?
                <Hero/>
                : ""}

        </section>
    )
}