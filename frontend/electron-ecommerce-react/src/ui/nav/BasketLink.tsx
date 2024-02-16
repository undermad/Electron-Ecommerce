import {useViewport} from "../../custom_hooks/useViewport.ts"
import {Link} from "react-router-dom";
import {BASKET_ROUTE} from "../../constants/Routes.ts";
import {BasketSvg} from "../../assets/icons/BasketSvg.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";
import {HoverScale} from "../reusable/HoverScale.tsx";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {useContext, useEffect, useState} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";

export const BasketLink = () => {
    const screenWidth = useViewport();
    const basketContext = useContext(BasketContext);
    const [basketQuantity, setBasketQuantity] = useState<number>(0);


    const countItems = (): number => {
        let totalQuantity = 0;
        basketContext.basket.items.map(item => {
            totalQuantity += item.quantity;
        })
        return totalQuantity;
    }

    useEffect(() => {
        setBasketQuantity(countItems);
    }, [basketContext.basket.items]);


    return (

        <HoverScale>
            <Link to={BASKET_ROUTE}>
                <div className={"flex gap-[8px] items-center"}>
                    <div className="relative">
                        <SmallSvgIcon>
                            <BasketSvg/>
                            <div
                                className={`${basketQuantity === 0 ? 'hidden ' : ''} absolute left-[60%] top-[0] w-[12px] h-[12px] text-[8px] flex justify-center items-center font-[700] rounded-full bg-electron-error`}>
                                {basketQuantity}
                            </div>
                        </SmallSvgIcon>
                    </div>

                    {screenWidth >= Breakpoints.LARGE ?
                        <span>Basket</span>
                        : ''
                    }
                </div>
            </Link>
        </HoverScale>
    )
}