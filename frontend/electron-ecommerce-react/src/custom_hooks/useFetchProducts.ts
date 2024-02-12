import {ProductWithFilterRequest} from "../api/dto/product/ProductWithFilterRequest.ts";
import {axiosBase, PRODUCT_API_PATH} from "../api/axios.ts";
import {useProductList} from "./useProductList.ts";

export const useFetchProducts = () => {

    const productContext = useProductList();


    return async (pageNo: number = 0) => {
        const filtersAsJson: { [key: string]: string[] } = {};
        productContext?.filters?.forEach((value, key) => {
            if (value.length !== 0) {
                filtersAsJson[key] = value;
            }
        });
        const requestData: ProductWithFilterRequest = {
            filters: filtersAsJson,
            priceRange: {
                minPrice: productContext?.priceValues[0],
                maxPrice: productContext?.priceValues[1],
            }
        }
        console.log(requestData);
        try {
            const response = await axiosBase.post(
                PRODUCT_API_PATH
                + `/${productContext?.categoryResponse.name}`
                + `?pageNo=${pageNo}`,
                requestData);

            productContext?.setPageableProductList({...response.data});
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }

}