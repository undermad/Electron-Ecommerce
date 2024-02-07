import {useViewport} from "../../custom_hooks/useViewport.ts"
import {Link} from "react-router-dom";
import {BASKET_ROUTE} from "../../constants/Routes.ts";
import {BasketSvg} from "../../assets/icons/BasketSvg.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";
import {HoverScale} from "../reusable/HoverScale.tsx";
import {Breakpoints} from "../../constants/Breakpoints.ts";

export const BasketLink = () => {
    const screenWidth = useViewport();


    return (

        <HoverScale>
            <Link to={BASKET_ROUTE}>
                <div className={"flex gap-[8px] items-center"}>
                    <SmallSvgIcon>
                        <BasketSvg/>
                    </SmallSvgIcon>

                    {screenWidth >= Breakpoints.LARGE ?
                        <span>Basket</span>
                        : ''
                    }
                </div>
            </Link>
        </HoverScale>
    )
}