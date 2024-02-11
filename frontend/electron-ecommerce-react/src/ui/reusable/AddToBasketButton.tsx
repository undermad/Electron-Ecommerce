import {FaPlus} from "react-icons/fa6";
import {FaMinus} from "react-icons/fa6";
import {Bold} from "./Bold.tsx";
import {useContext, useEffect, useState} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";
import {Product} from "../../api/dto/product/Product.ts";

type AddToBasketButtonProps = {
    product: Product,
}


export const AddToBasketButton = ({product}: AddToBasketButtonProps) => {

    const basketContext = useContext(BasketContext);
    const [currentQuantity, setCurrentQuantity] = useState<number>(1);


    const handleDecreaseButton = () => {
        console.log(basketContext.basket)
        if (currentQuantity === 1) return;
        setCurrentQuantity(currentQuantity - 1);
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition) {
            basketPosition.quantity--;
        }
    }

    const handleIncreaseButton = () => {
        setCurrentQuantity(currentQuantity + 1);
        console.log(currentQuantity)
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition) {
            basketPosition.quantity++
        }

    }

    const getPositionFromTheBasket = (productId: number) => {
        return basketContext.basket?.items.find(basketPosition =>
            basketPosition.product.productId === productId);

    }

    useEffect(() => {
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition)
            setCurrentQuantity(basketPosition.quantity);
    }, []);


    return (
        <div
            className={"text-electron-header-font justify-center items-center border border-electron-header-font shadow-md h-[48px] rounded-full flex gap-[12px]"}>
            <div className={"cursor-pointer h-full flex items-center pl-[14px]"}
                 onClick={handleDecreaseButton}
            >
                <FaMinus size={20}/>
            </div>
            <Bold textSize={18} weight={500}>
                {currentQuantity}
            </Bold>
            <div className={"cursor-pointer h-full flex items-center pr-[14px]"}
                 onClick={handleIncreaseButton}>
                <FaPlus size={20}/>
            </div>
        </div>
    )
}