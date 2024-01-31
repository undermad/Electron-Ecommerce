import {useParams} from "react-router-dom";
import {Container} from "../reusable/Container.tsx";
import {Filter} from "./Filter.tsx";
import {useEffect, useState} from "react";
import {axiosCategory} from "../../api/axios.ts";
import {CategoryResponse} from "../../api/dto/product/CategoryResponse.ts";
import {ProductList} from "./ProductList.tsx";
import {ProductListContextProvider} from "../../context/ProductListContext.tsx";


export const Search = () => {
    const param = useParams();
    const category = param.category;
    const [data, setData] = useState<CategoryResponse>({
        name: '',
        filters: new Map<string, string[]>,
        maxPrice: 1,
    });

    useEffect(() => {
        axiosCategory.get(`/${category}`)
            .then(response => {
                setData({...response.data})
            })
    }, [category])

    return (

        <Container>
            <div className={"flex gap-[42px] w-full mt-[24px]"}>
                <ProductListContextProvider>
                    <Filter maxPrice={data.maxPrice} filters={data.filters} category={category}/>
                    <ProductList/>
                </ProductListContextProvider>
            </div>
        </Container>
    )
}