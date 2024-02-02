import {useParams} from "react-router-dom";
import {Container} from "../reusable/Container.tsx";
import {Filter} from "./Filter.tsx";
import {useEffect} from "react";
import {axiosCategory} from "../../api/axios.ts";
import {ProductList} from "./ProductList.tsx";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";


export const Search = () => {
    const param = useParams();
    const category = param.category;
    const productContext = useProductList();
    const messageScreen = useMessageScreen();

    useEffect(() => {
        axiosCategory.get(`/${category}`)
            .then(response => {
                if (response.data.name != productContext?.categoryResponse.name) {
                    console.log("IS NOT SAME")
                    productContext?.setCategoryResponse({...response.data});
                }
            })
            .catch(error => {
                console.log(error)
                messageScreen(error.response.data.message);
            })
    }, [category])

    return (

        <Container>
            <div className={"flex gap-[42px] w-full mt-[24px]"}>
                <Filter maxPrice={productContext?.categoryResponse.maxPrice}
                        filters={productContext?.categoryResponse.filters}/>
                <ProductList/>
            </div>
        </Container>
    )
}