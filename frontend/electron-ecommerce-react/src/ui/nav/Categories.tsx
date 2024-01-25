import {ExpandingButton} from "./ExpandingButton.tsx";
import {ListSvg} from "../../assets/icons/ListSvg.tsx";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";

export const Categories = () => {
    const items: Map<string, string> = new Map();
    items.set('Graphic cards', SEARCH_ROUTE + "/gpu")
    items.set('Memory', SEARCH_ROUTE + "/memory")
    items.set('Monitors', SEARCH_ROUTE + "/monitors")
    items.set('Headphones', SEARCH_ROUTE + "/headphones")
    return (
        <ExpandingButton items={items} name="Categories" svg={<ListSvg/>}/>
    )
}