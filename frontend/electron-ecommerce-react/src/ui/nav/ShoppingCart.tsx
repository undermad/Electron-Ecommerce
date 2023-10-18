import basketSVG from "../../assets/icons/basket.svg";
import {useViewport} from "../custom_hooks/CustomHooks.ts"

export const ShoppingCart = () => {
    const width = useViewport();


    return (

        <div className={"flex gap-[8px] items-center"}>
            <img src={basketSVG} className={"w-[20px] h-[20px]"} alt={'basket svg icon'}/>

            {width >= 1024 ?
                <span>Cart</span>
                : ''
            }
        </div>
    )
}