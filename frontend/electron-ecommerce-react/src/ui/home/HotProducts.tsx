import {Header3} from "../reusable/Header3.tsx";
import {MobileCard} from "../search/MobileCard.tsx";
import {useEffect, useState} from "react";
import {axiosBase, HOT_PRODUCTS_API_PATH, PRODUCT_API_PATH} from "../../api/axios.ts";
import {Product} from "../../api/dto/product/Product.ts";
import {RevealAnimation} from "../reusable/RevealAnimation.tsx";
import {useErrorNotification} from "../../custom_hooks/useErrorNotification.ts";

export const HotProducts = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const errorNotification = useErrorNotification();

    useEffect(() => {
        setLoading(true)
        axiosBase.get(PRODUCT_API_PATH + HOT_PRODUCTS_API_PATH)
            .then(result => {
                setProducts(result.data);
            })
            .catch(() => {
                errorNotification('Ups...')
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);


    return (

        <div className="flex flex-col gap-[24px]">
            <Header3>Top Popular Products</Header3>
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[20px] gap-y-[26px]">
                {loading && <div className="h-screen"></div>}
                {products.map((item, index) => (
                    <RevealAnimation key={index}>
                        <MobileCard product={item}/>
                    </RevealAnimation>
                ))}

            </main>

        </div>
    )
}