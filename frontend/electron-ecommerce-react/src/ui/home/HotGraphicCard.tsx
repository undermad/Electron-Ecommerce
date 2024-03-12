import {useEffect, useState} from "react";
import {Product} from "../../api/dto/product/Product.ts";
import {axiosBase, HOT_CATEGORY_PRODUCTS_API_PATH, PRODUCT_API_PATH} from "../../api/axios.ts";
import {CategoryHero} from "./CategoryHero.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {MobileCard} from "../search/MobileCard.tsx";
import {RevealAnimation} from "../reusable/RevealAnimation.tsx";

export const HotGraphicCard = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axiosBase.get(`${PRODUCT_API_PATH}/${HOT_CATEGORY_PRODUCTS_API_PATH}?category=graphic card`)
            .then(result => {
                setProducts(result.data);
            })
    }, []);

    return (
        <div className="flex gap-5 flex-col">
            <CategoryHero imgSrc="https://electron-img-01.s3.eu-west-2.amazonaws.com/gpu_gpt.webp"
                          imgLeft={true}
                          header="Most efficient graphic cards"
                          headerDescription="Move your gaming to the highest quality with 4k resolution."
                          category="graphic card">
                Experience stunning visuals and peak performance with our premium graphics cards. Discover your ultimate
                upgrade in our collection!
            </CategoryHero>


            <div className="mt-[24px]">
                <Header3>Top graphic card products</Header3>
            </div>
            <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map((item, index) => (
                    <RevealAnimation key={index}>
                        <MobileCard product={item}/>
                    </RevealAnimation>
                ))}
            </div>


        </div>
    )
}