import {Header3} from "../reusable/Header3.tsx";
import {ProductListItem} from "./ProductListItem.tsx";
import {useContext, useEffect, useState} from "react";
import {ProductListContext} from "../../context/ProductListContext.tsx";
import {Product} from "../../api/dto/product/Product.ts";


export const ProductList = () => {
    const pageableProductListContext = useContext(ProductListContext);
    const [productList, setProductList] = useState<Product[] | null>(null);


    useEffect(() => {
        setProductList(pageableProductListContext?.pageableProductList?.content || null);
    }, [pageableProductListContext?.pageableProductList]);

    return (
        <div className="w-full">
            <Header3 tailwind="mb-[20px]">Search Result</Header3>
            <div className="flex flex-col gap-[20px]">
                {productList?.map((product, index) => (
                    <ProductListItem product={product} key={index}/>
                ))}


            </div>
        </div>
    )
}