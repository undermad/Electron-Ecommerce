import {axiosBase, GET_BY_QUERY, PRODUCT_API_PATH} from "../api/axios.ts";
import {useProductList} from "./useProductList.ts";
import {SEARCH_BY_QUERY_ROUTE} from "../constants/Routes.ts";
import {useNavigate} from "react-router-dom";


export const useFetchProductsByQuery = () => {
    const productContext = useProductList();
    const navigate = useNavigate();

    return async (pageNo: number = 0) => {
        try {
            const response = await axiosBase.get(
                `${PRODUCT_API_PATH}${GET_BY_QUERY}` +
                `?query=${productContext?.query}&pageNo=${pageNo}&sortBy=${productContext?.sortBy}&sortDirection=${productContext?.sortDirection}`);
            productContext?.setPageableProductList({...response.data});
            navigate(SEARCH_BY_QUERY_ROUTE);
        } catch (error) {
            console.log(error);
        }
    }
}