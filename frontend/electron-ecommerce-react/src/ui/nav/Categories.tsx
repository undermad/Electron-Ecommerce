import {ExpandingButton} from "./ExpandingButton.tsx";
import {ListSvg} from "../../assets/icons/ListSvg.tsx";
import {useEffect, useState} from "react";
import {axiosBase, CATEGORY_API_PATH, GET} from "../../api/axios.ts";
import {CategoryResponse} from "../../api/dto/product/CategoryResponse.ts";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";
import {useErrorNotification} from "../../custom_hooks/useErrorNotification.ts";

export const Categories = () => {

    const [items, setItems] = useState<Map<string, string>>(new Map());

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const errorNotification = useErrorNotification();

    function capitalizeFirstLetter(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {

        const m: Map<string, string> = new Map();
        categories.forEach(category => {
            if (category.name)
                m.set(capitalizeFirstLetter(category.name), `${SEARCH_ROUTE}/${category.name}`);
        })
        setItems(m);
    }, [categories]);

    useEffect(() => {
        axiosBase.get(CATEGORY_API_PATH + GET)
            .then(response => {
                setCategories(response.data)
            })
            .catch(() => {
                errorNotification('Ups...');
            })
    }, []);


    return (
        <ExpandingButton items={items} name="Categories" svg={<ListSvg/>}/>
    )
}