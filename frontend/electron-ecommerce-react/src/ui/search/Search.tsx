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
        filters: {},
        maxPrice: 1,
    });


    useEffect(() => {
        axiosCategory.get(`/${category}`)
            .then(response => {
                setData({...response.data})
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })

    }, [category])


    return (

        <Container>
            <div className={"flex gap-[42px] w-full mt-[24px]"}>
                <Filter maxPrice={data.maxPrice} filters={data.filters}/>

                <ProductList category={category}/>
            </div>
        </Container>
    )
}