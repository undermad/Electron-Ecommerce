import {useEffect} from "react";
import {axiosBase, PRODUCT_CATEGORY_PATH} from "../../api/axios.ts";

type ProductListProps = {
    category?: string,
}

export const ProductList = ({category}: ProductListProps) => {

    useEffect(() => {
        axiosBase.get(PRODUCT_CATEGORY_PATH + `?category=${category}`)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })


    },[])

    return (
        <div></div>
    )
}