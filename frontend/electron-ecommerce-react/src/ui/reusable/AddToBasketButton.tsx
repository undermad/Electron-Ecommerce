import {FaMinus, FaPlus} from "react-icons/fa6";
import {Bold} from "./Bold.tsx";
import {useContext, useEffect, useState} from "react";
import {BasketContext} from "../../context/BasketContext.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {BasketPosition} from "../../api/dto/basket/Basket.ts";
import {ADD, BASKET_API_PATH, REMOVE} from "../../api/axios.ts";
import {AddToBasketRequest} from "../../api/dto/basket/AddToBasketRequest.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {RemoveFromBasketRequest} from "../../api/dto/basket/RemoveFromBasketRequest.ts";

type AddToBasketButtonProps = {
    product: Product,
}


export const AddToBasketButton = ({product}: AddToBasketButtonProps) => {

    const axiosPrivate = useAxiosPrivate();
    const basketContext = useContext(BasketContext);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDecreaseButton = () => {
        if (currentQuantity === 0) return;
        decrementQuantityApi()
            .then(() => {
                setCurrentQuantity(currentQuantity - 1);
                const basketPosition = getPositionFromTheBasket(product.productId);
                if (basketPosition) {
                    if (basketPosition.quantity === 1) removePositionFromBasket(basketPosition);
                    else basketPosition.quantity--;
                }
            })
            .catch((error) => {
              console.log(error)
            })
    }

    const handleIncreaseButton = () => {
        incrementQuantityApi()
            .then(() => {
                setCurrentQuantity(currentQuantity + 1);
                const basketPosition = getPositionFromTheBasket(product.productId);
                if (basketPosition) {
                    basketPosition.quantity++
                }
            })
    }

    const removePositionFromBasket = (basketPosition: BasketPosition) => {
        const newBasket = basketContext.basket?.items.filter(position => position !== basketPosition)
        if (newBasket) basketContext.setBasket({...basketContext.basket, items: newBasket});
    }


    const addToBasket = () => {
        if (currentQuantity === 0 && !loading) {
            incrementQuantityApi()
                .then(() => {
                    const basketPosition: BasketPosition = {
                        product: product,
                        quantity: 1,
                    }
                    basketContext.basket?.items.push(basketPosition);
                    setCurrentQuantity(1);
                })

        }
    }

    const getPositionFromTheBasket = (productId: number) => {
        return basketContext.basket?.items.find(basketPosition =>
            basketPosition.product.productId === productId);

    }

    const incrementQuantityApi = async () => {
        setLoading(true);
        const basketPosition = getPositionFromTheBasket(product.productId);

        const data: AddToBasketRequest = {
            productId: product.productId,
            beforeQuantityInBasket: basketPosition?.quantity ?? 0,
        };
        return await axiosPrivate.patch(BASKET_API_PATH + ADD, data)
            .finally(() => setLoading(false));
    }

    const decrementQuantityApi = async () => {
        setLoading(true);
        const data: RemoveFromBasketRequest = {productId: product.productId}
        return await axiosPrivate.patch(BASKET_API_PATH + REMOVE, data)
            .finally(() => setLoading(false));
    }


    useEffect(() => {
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition) {
            setCurrentQuantity(basketPosition.quantity);
        }
    }, [basketContext.basket]);


    return (
        <div
            className={`${currentQuantity === 0 ? 'text-electron-primary-white bg-electron-primary-dark-blue cursor-pointer' : 'text-electron-header-font'} justify-center items-center border border-electron-header-font shadow-md h-[48px] rounded-full flex gap-[12px]`}
            onClick={addToBasket}>

            {currentQuantity > 0 ?
                <>
                    <button className={"cursor-pointer h-full flex items-center pl-[14px]"}
                            disabled={loading}
                            onClick={handleDecreaseButton}>
                        <FaMinus size={20}/>
                    </button>
                    <Bold textSize={18} weight={500}>
                        {currentQuantity}
                    </Bold>
                    <button className={"cursor-pointer h-full flex items-center pr-[14px]"}
                            disabled={loading}
                            onClick={handleIncreaseButton}>
                        <FaPlus size={20}/>
                    </button>
                </>
                :
                <div>
                    Add
                </div>
            }
        </div>
    )
}
