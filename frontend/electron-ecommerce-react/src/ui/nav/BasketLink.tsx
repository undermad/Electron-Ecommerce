import {useViewport} from "../../custom_hooks/useViewport.ts"
import {Link} from "react-router-dom";
import {BASKET_ROUTE} from "../../constants/Routes.ts";
import {BasketSvg} from "../../assets/icons/BasketSvg.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";
import {HoverScale} from "../reusable/HoverScale.tsx";

export const BasketLink = () => {
    const width = useViewport();


    return (

        <HoverScale>
            <Link to={BASKET_ROUTE}>
                <div className={"flex gap-[8px] items-center"}>
                    <SmallSvgIcon>
                        <BasketSvg/>
                    </SmallSvgIcon>

                    {width >= 1024 ?
                        <span>Basket</span>
                        : ''
                    }
                </div>
            </Link>
        </HoverScale>
    )
}