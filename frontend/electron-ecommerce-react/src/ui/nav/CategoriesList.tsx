import arrowDownSVG from "../../assets/icons/arrow-down.svg";
import listSVG from '../../assets/icons/list.svg';
import {useViewport} from "../custom_hooks/CustomHooks.ts";
import {Breakpoints} from "../custom_hooks/Breakpoints.ts";


export const CategoriesList = () => {
    const width = useViewport();


    return (
        <div className={"flex gap-[24px] items-center"}>
            {width >= Breakpoints.LARGE ?
                <div className={'flex gap-[6px] items-center'}>
                    <span className={"h-10px"}>Product Category</span>
                    <img src={arrowDownSVG} className={"w-[20px] h-[20px]"} alt={'arrow down'}/>
                </div>
                :
                <img src={listSVG} alt={'categories list svg'} className={"w-[20px] h-[20px]"}/>
            }
        </div>

    )
}