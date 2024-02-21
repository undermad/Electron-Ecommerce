import {Header2} from "../reusable/Header2.tsx";
import {useContext, useEffect, useState} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";
import {TotalSummary} from "./TotalSummary.tsx";

export const BasketTotal = () => {

    const basketContext = useContext(BasketContext);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);


    useEffect(() => {
        let totalPrice = 0;
        let amountOfItems = 0;
        basketContext.basket.items.map(item => {
            totalPrice += item.product.price * item.quantity;
            amountOfItems += item.quantity;
        })
        setTotalItems(amountOfItems);
        setSubtotal(totalPrice);
    }, [basketContext.basket]);

    return (
        <div className=" p-[24px] border border-electron-product-listing-bg rounded-lg">
            <div className="mb-[17px] border-b border-electron-product-listing-bg">
                <Header2>TOTAL</Header2>
            </div>
            <TotalSummary totalItems={totalItems} totalPrice={subtotal}/>


        </div>
    )
}