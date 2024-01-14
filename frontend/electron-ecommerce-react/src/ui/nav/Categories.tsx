import {ExpandingButton} from "./ExpandingButton.tsx";
import {ListSvg} from "../../assets/icons/ListSvg.tsx";

export const Categories = () => {
    const items: string[] = ['GPU', 'CPU', 'Monitors', 'Headphones', 'Accessories'];

    return(
        <ExpandingButton items={items} name="Categories" svg={<ListSvg/>}/>
    )
}