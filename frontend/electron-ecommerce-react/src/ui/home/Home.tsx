import {Hero} from "./Hero.tsx";
import {Container} from "../reusable/Container.tsx";
import {HotProducts} from "./HotProducts.tsx";
import {CategoriesBanner} from "./CategoriesBanner.tsx";
import {HotMemory} from "./HotMemory.tsx";
import {HotGraphicCard} from "./HotGraphicCard.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";


export const Home = () => {

    useScrollToTop();

    return (
        <>
            <Hero/>
            <Container>
                <main
                    className="flex flex-col gap-[42px]">

                        <CategoriesBanner/>

                        <HotProducts/>

                        <HotMemory/>

                        <HotGraphicCard/>


                </main>
            </Container>
        </>
    )
}