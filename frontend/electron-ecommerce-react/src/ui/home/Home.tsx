import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Hero} from "./Hero.tsx";
import {Container} from "../reusable/Container.tsx";

export const Home = () => {

    const width = useViewport();



    return (
        <Container>


            {width >= Breakpoints.SMALL ?
                <Hero/>
                : ""}

        </Container>
    )
}