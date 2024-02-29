import {useNavigate} from "react-router-dom";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";

type CategoriesFilterListProps = {
    categories: Set<string>,
}

export const CategoriesFilterList = ({categories}: CategoriesFilterListProps) => {

    const navigate = useNavigate();

    const handleClick = (value: string) => {
        navigate(`${SEARCH_ROUTE}/${value}`);
    }

    return (
        <div className="flex flex-col gap-[24px] overflow-y-auto px-4">

            {Array.from(categories).map((value, index) => (
                <p className="cursor-pointer px-[10px] hover:bg-electron-bright-blue py-[2px] text-electron-light-blue bg-electron-very-light-blue rounded-lg"
                   onClick={() => handleClick(value)}
                   key={index}>
                    {value}
                </p>
            ))}
        </div>
    )
}