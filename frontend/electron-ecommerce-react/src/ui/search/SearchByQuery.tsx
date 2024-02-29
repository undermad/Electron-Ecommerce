import {Container} from "../reusable/Container.tsx";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {ProductListItem} from "./ProductListItem.tsx";
import {useEffect, useState} from "react";
import {PageableResponse} from "../../api/dto/PageableResponse.ts";
import {Product} from "../../api/dto/product/Product.ts";
import {SortByButton} from "./SortByButton.tsx";
import {useFetchProductsByQuery} from "../../custom_hooks/useFetchProductsByQuery.ts";


export const SearchByQuery = () => {
    const productContext = useProductList();
    const [pageableProductList, setPageableProductList] = useState<PageableResponse<Product>>({
        pageNo: 1,
        totalPages: 1,
        totalElements: 0,
        pageSize: 25,
        content: []
    });

    const fetchByQuery = useFetchProductsByQuery();


    useEffect(() => {
        if (productContext?.pageableProductList) {
            setPageableProductList(productContext?.pageableProductList);
        }

    }, [productContext?.pageableProductList]);


    return (
        <Container>
            <SortByButton fetch={fetchByQuery}/>
            <div className="flex flex-col gap-[24px] ">
                {pageableProductList?.content.map((product, index) => (
                    <ProductListItem product={product} key={index}/>
                ))}
            </div>
        </Container>
    )
}