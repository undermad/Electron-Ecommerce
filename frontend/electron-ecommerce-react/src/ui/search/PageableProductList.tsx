import {Header3} from "../reusable/Header3.tsx";
import {ProductListItem} from "./ProductListItem.tsx";
import {useEffect, useState} from "react";
import {Product} from "../../api/dto/product/Product.ts";
import {PageController} from "./PageController.tsx";
import {PageableResponse} from "../../api/dto/PageableResponse.ts";
import {useProductList} from "../../custom_hooks/useProductList.ts";


export const PageableProductList = () => {
    const productContext = useProductList();
    const [pageableProductList, setPageableProductList] = useState<PageableResponse<Product>>({
        pageNo: 1,
        totalPages: 1,
        totalElements: 0,
        pageSize: 25,
        content: []
    });


    useEffect(() => {
        if (productContext?.pageableProductList) {
            setPageableProductList(productContext?.pageableProductList);
        }

    }, [productContext?.pageableProductList]);


    return (
        <div className="w-full">
            <div className="flex flex-col gap-[20px]">
                <Header3>Search Result</Header3>
                <div className="flex flex-col gap-[24px]">
                    {pageableProductList?.content.map((product, index) => (
                            <ProductListItem product={product} key={index}/>
                    ))}
                </div>
                <PageController pageNo={pageableProductList?.pageNo}
                                totalPages={pageableProductList?.totalPages}/>
            </div>
        </div>
    )
}