import {Hero} from "./Hero.tsx";
import {Container} from "../reusable/Container.tsx";
import {HotProducts} from "./HotProducts.tsx";
import {CategoriesBanner} from "./CategoriesBanner.tsx";
import {HotMemory} from "./HotMemory.tsx";
import {HotGraphicCard} from "./HotGraphicCard.tsx";

export const Home = () => {


    return (
        <Container>
            <main className="flex flex-col gap-[42px]">

                <Hero/>
                <CategoriesBanner/>

                <HotProducts/>

                <HotMemory/>
                <HotGraphicCard/>




            </main>
        </Container>
    )
}