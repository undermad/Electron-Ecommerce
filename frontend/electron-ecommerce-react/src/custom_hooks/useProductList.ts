import {useContext} from "react";
import {ProductContext} from "../context/ProductContext.tsx";

export const useProductList = () => {
    return useContext(ProductContext);
}
