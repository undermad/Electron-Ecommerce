import {useViewport} from "../../custom_hooks/useViewport.ts"
import {Link} from "react-router-dom";
import {BASKET_ROUTE} from "../../constants/Routes.ts";
import {BasketSvg} from "../../assets/icons/BasketSvg.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";

export const BasketLink = () => {
    const width = useViewport();


    return (

        <Link to={BASKET_ROUTE}>
            <div className={"flex gap-[8px] items-center"}>
                <SmallSvgIcon>
                    <BasketSvg/>
                </SmallSvgIcon>

                {width >= 1024 ?
                    <span>Cart</span>
                    : ''
                }
            </div>
        </Link>
    )
}