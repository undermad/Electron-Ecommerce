import {useContext} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";
import {ProductListItem} from "../search/ProductListItem.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";

export const BasketPositionsList = () => {

    const basketContext = useContext(BasketContext);

    return (
        <div className="w-full flex flex-col gap-[20px]">
            {basketContext.basket.items.length === 0 ?
                <ParagraphSmall>Your basket is empty</ParagraphSmall>
                :
                <>
                    {basketContext.basket.items.map((item, index) => (
                        <ProductListItem key={index} product={item.product}/>
                    ))}
                </>
            }
        </div>
    )
}