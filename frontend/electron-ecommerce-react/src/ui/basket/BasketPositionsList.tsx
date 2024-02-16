import {useContext} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";
import {ProductListItem} from "../search/ProductListItem.tsx";

export const BasketPositionsList = () => {

    const basketContext = useContext(BasketContext);

    return (
        <div className="w-full">
            {basketContext.basket.items.map((item, index) => (
                <ProductListItem key={index} product={item.product}/>
            ))}
        </div>
    )
}