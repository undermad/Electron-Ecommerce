import {Header2} from "../reusable/Header2.tsx";
import {Span} from "../reusable/Span.tsx";
import {useContext, useEffect, useState} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";

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
            <div
                className={"flex flex-col gap-[17px] mt-[17px] border-b border-electron-product-listing-bg"}>
                <div className="flex justify-between">
                    <Span>Total items</Span>
                    <Span>{totalItems}</Span>
                </div>
                <div className="flex justify-between">
                    <Span>Delivery cost</Span>
                    <Span>Free delivery</Span>
                </div>
                <div className="flex justify-between pb-[17px]">
                    <Span>Discount</Span>
                    <Span>£0</Span>
                </div>
            </div>
            <div className="flex justify-between mt-[17px]">
                <Span>Total</Span>
                <Span>£{subtotal}</Span>
            </div>


        </div>
    )
}