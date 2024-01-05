import basketSVG from "../../assets/icons/basket.svg";
import {useViewport} from "../custom_hooks/useViewport.ts"
import {Link} from "react-router-dom";
import {BASKET} from "../../constants/Routes.ts";

export const BasketLink = () => {
    const width = useViewport();


    return (

        <Link to={BASKET}>
            <div className={"flex gap-[8px] items-center"}>
                <img src={basketSVG} className={"w-[20px] h-[20px]"} alt={'basket svg icon'}/>

                {width >= 1024 ?
                    <span>Cart</span>
                    : ''
                }
            </div>
        </Link>
    )
}