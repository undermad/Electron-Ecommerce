import {FaPlus} from "react-icons/fa6";
import {FaMinus} from "react-icons/fa6";
import {Bold} from "./Bold.tsx";
import {useContext, useEffect, useState} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {BasketPosition} from "../../api/dto/basket/Basket.ts";

type AddToBasketButtonProps = {
    product: Product,
}


export const AddToBasketButton = ({product}: AddToBasketButtonProps) => {

    const basketContext = useContext(BasketContext);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);

    const handleDecreaseButton = () => {
        if (currentQuantity === 0) return;
        setCurrentQuantity(currentQuantity - 1);
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition) {
            if (basketPosition.quantity === 1) removePositionFromBasket(basketPosition);
            else basketPosition.quantity--;
        }
    }

    const handleIncreaseButton = () => {
        console.log(basketContext.basket)
        setCurrentQuantity(currentQuantity + 1);
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition) {
            basketPosition.quantity++
        }
    }

    const removePositionFromBasket = (basketPosition: BasketPosition) => {
        const newBasket = basketContext.basket?.items.filter(position => position !== basketPosition)
        if (newBasket) basketContext.setBasket({...basketContext.basket, items: newBasket});
    }


    const addToBasket = () => {
        if (currentQuantity === 0) {
            console.log(basketContext.basket)
            const basketPosition: BasketPosition = {
                product: product,
                quantity: 1,
            }
            basketContext.basket?.items.push(basketPosition);
            setCurrentQuantity(1);
        }
    }

    const getPositionFromTheBasket = (productId: number) => {
        return basketContext.basket?.items.find(basketPosition =>
            basketPosition.product.productId === productId);

    }

    useEffect(() => {
        console.log("Product passed to the button")
        console.log(product)
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition) {
            console.log("use effect");
            setCurrentQuantity(basketPosition.quantity);
        }
    }, []);


    return (
        <div
            className={`${currentQuantity === 0 ? 'text-electron-primary-white bg-electron-primary-dark-blue cursor-pointer' : 'text-electron-header-font'} justify-center items-center border border-electron-header-font shadow-md h-[48px] rounded-full flex gap-[12px]`}
            onClick={addToBasket}>

            {currentQuantity > 0 ?
                <>
                    <div className={"cursor-pointer h-full flex items-center pl-[14px]"}
                         onClick={handleDecreaseButton}>
                        <FaMinus size={20}/>
                    </div>
                    <Bold textSize={18} weight={500}>
                        {currentQuantity}
                    </Bold>
                    <div className={"cursor-pointer h-full flex items-center pr-[14px]"}
                         onClick={handleIncreaseButton}>
                        <FaPlus size={20}/>
                    </div>
                </>
                :
                <div>
                    Add
                </div>
            }
        </div>
    )
}
