import {ExpandingButton} from "./ExpandingButton.tsx";
import {ListSvg} from "../../assets/icons/ListSvg.tsx";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";

export const Categories = () => {
    const items: Map<string, string> = new Map();
    items.set('GPU', SEARCH_ROUTE)
    items.set('CPU', SEARCH_ROUTE)
    items.set('Screens', SEARCH_ROUTE)
    items.set('Headphones', SEARCH_ROUTE)
    items.set('Accessories', SEARCH_ROUTE)
    return (
        <ExpandingButton items={items} name="Categories" svg={<ListSvg/>}/>
    )
}