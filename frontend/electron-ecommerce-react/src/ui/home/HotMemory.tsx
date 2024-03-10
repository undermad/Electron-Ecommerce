import {useEffect, useState} from "react";
import {Product} from "../../api/dto/product/Product.ts";
import {axiosBase, HOT_CATEGORY_PRODUCTS_API_PATH, PRODUCT_API_PATH} from "../../api/axios.ts";
import {MobileCard} from "../search/MobileCard.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {CategoryHero} from "./CategoryHero.tsx";
import {RevealAnimation} from "../reusable/RevealAnimation.tsx";

export const HotMemory = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axiosBase.get(`${PRODUCT_API_PATH}/${HOT_CATEGORY_PRODUCTS_API_PATH}?category=memory`)
            .then(result => {
                console.log(result);
                setProducts(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className="flex gap-5 flex-col">
                <CategoryHero imgSrc="https://electron-img-01.s3.eu-west-2.amazonaws.com/ram_gpt.webp"
                              imgLeft={false}
                              header="Fastest memory on the market"
                              headerDescription="Don't wait any longer and check out our best offer."
                              category="memory">
                    Upgrade your tech with our advanced memory solutions. Our random access memory deliver
                    speed, reliability, and seamless data access.
                </CategoryHero>


            <div className="mt-[24px]">
                <Header3>Top memory products</Header3>
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