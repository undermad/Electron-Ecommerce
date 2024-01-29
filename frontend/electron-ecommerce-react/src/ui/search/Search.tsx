import {useParams} from "react-router-dom";
import {Container} from "../reusable/Container.tsx";
import {Filter} from "./Filter.tsx";
import {useEffect, useState} from "react";
import {axiosCategory} from "../../api/axios.ts";
import {CategoryResponse} from "../../api/dto/CategoryResponse.ts";
import {ProductList} from "./ProductList.tsx";


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


    useEffect(() => {
        console.log(data)
    }, [data]);




    return (

        <Container>
            <div className={"flex gap-[42px] w-full mt-[24px]"}>
                <Filter maxPrice={data.maxPrice} filters={data.filters}/>

                <ProductList/>
            </div>
        </Container>
    )
}