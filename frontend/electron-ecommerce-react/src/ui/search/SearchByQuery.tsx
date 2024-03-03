import {Container} from "../reusable/Container.tsx";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {ProductListItem} from "./ProductListItem.tsx";
import {useEffect, useState} from "react";
import {PageableResponse} from "../../api/dto/PageableResponse.ts";
import {Product} from "../../api/dto/product/Product.ts";
import {SortByButton} from "./SortByButton.tsx";
import {useFetchProductsByQuery} from "../../custom_hooks/useFetchProductsByQuery.ts";
import {CategoriesFromQuery} from "./CategoriesFromQuery.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {CategoriesFilterList} from "./CategoriesFilterList.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";


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
    const [categories, setCategories] = useState<Set<string>>(new Set<string>);
    const viewport = useViewport();

    function capitalizeFirstLetter(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        if (productContext?.pageableProductList) {
            setPageableProductList(productContext?.pageableProductList);
            const categoriesList = new Set<string>;
            productContext.pageableProductList.content.forEach(value => {
                categoriesList.add(capitalizeFirstLetter(value.category));
            })
            setCategories(categoriesList);
        }
    }, [productContext?.pageableProductList]);

    return (
        <Container>

            {viewport >= Breakpoints.LARGE ?
                <main className="flex">
                    <div className={"w-1/4 flex flex-col gap-5"}>
                        <div className="flex flex-col pl-4">
                            <Header3>Categories</Header3>
                            <ParagraphSmall tailwind="text-[14px]">Explore by categories</ParagraphSmall>
                        </div>
                        <CategoriesFilterList categories={categories}/>
                    </div>

                    <figure className="flex flex-col gap-[20px]">
                        <Header3>Search Result</Header3>
                        <SortByButton fetch={fetchByQuery}/>
                        <div className="flex flex-col gap-[24px] ">
                            {pageableProductList?.content.map((product, index) => (
                                <ProductListItem product={product} key={index}/>
                            ))}
                        </div>
                    </figure>
                </main>
                :


                <main className="flex flex-col gap-[20px]">
                    <Header3>Search Result</Header3>
                    <div className="flex flex-col sm:flex-row justify-between gap-[17px]">
                        <CategoriesFromQuery categories={categories}/>
                        <SortByButton fetch={fetchByQuery}/>
                    </div>
                    <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:flex lg:flex-col ">
                    {pageableProductList?.content.map((product, index) => (
                            <ProductListItem product={product} key={index}/>
                        ))}
                    </div>
                </main>
            }


        </Container>
    )
}