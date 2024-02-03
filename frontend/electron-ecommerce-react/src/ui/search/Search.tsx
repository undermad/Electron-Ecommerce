import {useParams} from "react-router-dom";
import {Container} from "../reusable/Container.tsx";
import {Filter} from "./Filter.tsx";
import {useEffect} from "react";
import {axiosCategory} from "../../api/axios.ts";
import {ProductList} from "./ProductList.tsx";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";


export const Search = () => {
    const param = useParams();
    const category = param.category;
    const productContext = useProductList();
    const messageScreen = useMessageScreen();

    useEffect(() => {
        if (productContext?.categoryResponse.name !== category) {
            axiosCategory.get(`/${category}`)
                .then(response => {
                    productContext?.setCategoryResponse({...response.data});
                    const newVariations = new Map<string, string[]>;
                    Object.entries(response.data.filters).forEach(([key]) => {
                        newVariations.set(key, []);
                    })
                    productContext?.setFilters(newVariations);
                    productContext?.setPriceValues([0, response.data?.maxPrice])
                })
                .catch(error => {
                    messageScreen(error.response.data.message);
                })
        }
    }, [category])

    return (
        <Container>
            <div className={"flex gap-[42px] w-full mt-[24px]"}>
                <Filter/>
                <ProductList/>
            </div>
        </Container>
    )
}