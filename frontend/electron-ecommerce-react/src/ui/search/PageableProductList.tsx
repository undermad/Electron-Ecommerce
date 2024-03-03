import {Header3} from "../reusable/Header3.tsx";
import {ProductListItem} from "./ProductListItem.tsx";
import {useEffect, useState} from "react";
import {Product} from "../../api/dto/product/Product.ts";
import {PageController} from "./PageController.tsx";
import {PageableResponse} from "../../api/dto/PageableResponse.ts";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {SortByButton} from "./SortByButton.tsx";
import {FilterSection} from "./FilterSection.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";


export const PageableProductList = () => {
    const productContext = useProductList();
    const [pageableProductList, setPageableProductList] = useState<PageableResponse<Product>>({
        pageNo: 1,
        totalPages: 1,
        totalElements: 0,
        pageSize: 25,
        content: []
    });
    const viewport = useViewport();
    const fetchProducts = useFetchProducts();



    useEffect(() => {
        if (productContext?.pageableProductList) {
            setPageableProductList(productContext?.pageableProductList);
        }

    }, [productContext?.pageableProductList]);


    return (
        <div className="w-full">
            <div className="flex flex-col gap-[20px]">
                <Header3>Search Result</Header3>
                <div className="flex flex-col sm:flex-row justify-between w-full gap-[17px]">
                    {viewport <= Breakpoints.MEDIUM ?
                        <FilterSection/>
                        : <></>
                    }
                    <SortByButton fetch={fetchProducts}/>
                </div>
                <ParagraphSmall>{pageableProductList.totalElements} items</ParagraphSmall>
                <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:flex lg:flex-col ">
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