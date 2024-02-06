import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {axiosCategory} from "../../api/axios.ts";

export const ProductView = () => {

    const param = useParams();
    const category = param.category;
    const productId = param.productId;


    useEffect(() => {
        axiosCategory.get(`/${category}/${productId}`)
            .then(response => {
                console.log(response);
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