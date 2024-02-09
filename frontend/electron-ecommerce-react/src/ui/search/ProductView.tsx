import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosBase, PRODUCT_API_PATH} from "../../api/axios.ts";
import {defaultProduct, Product} from "../../api/dto/product/Product.ts";

export const ProductView = () => {

    const param = useParams();
    const category = param.category;
    const productId = param.productId;
    const [product, setProduct] = useState<Product>(defaultProduct);

    useEffect(() => {
        axiosBase.get(PRODUCT_API_PATH + `/${productId}`)
            .then(response => {
                setProduct(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <>
            {category} {productId}
        </>
    )
}
