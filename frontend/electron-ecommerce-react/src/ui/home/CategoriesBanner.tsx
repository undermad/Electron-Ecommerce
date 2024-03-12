import {useEffect, useState} from "react";
import {axiosBase, CATEGORY_API_PATH, GET} from "../../api/axios.ts";
import {CategoryResponse} from "../../api/dto/product/CategoryResponse.ts";
import {useNavigate} from "react-router-dom";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";
import {RevealAnimation} from "../reusable/RevealAnimation.tsx";

export const CategoriesBanner = () => {

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [cat, setCat] = useState<string[]>([]);
    const navigate = useNavigate();

    function capitalizeFirstLetter(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleClick = (category: string) => {
        const lowerCaseCategory = category.charAt(0).toLowerCase() + category.slice(1);
        navigate(`${SEARCH_ROUTE}/${lowerCaseCategory}`)
    }

    useEffect(() => {
        axiosBase.get(CATEGORY_API_PATH + GET)
            .then(response => {
                setCategories(response.data)
            })
    }, []);

    useEffect(() => {
        const cat: Array<string> = [];
        categories.forEach(category => {
            if (category.name)
                cat.push(capitalizeFirstLetter(category.name));
        })
        setCat(cat);
    }, [categories]);

    return (
        <RevealAnimation>

            <div className="p-[10px] grid grid-cols-2 sm:flex gap-[19px] text-center justify-center border border-electron-grey rounded-lg w-full">

                {cat.map((item, index) => (
                    <div
                        onClick={() => handleClick(item)}
                        className=" bg-electron-very-light-blue hover:bg-electron-bright-blue font-[500] text-[14px] sm:text-[16px] p-[10px] md:p-[16px] border border-electron-grey rounded-lg cursor-pointer"
                        key={index}>
                        {item}
                    </div>
                ))}
            </div>
        </RevealAnimation>

    )
}