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
import {useErrorNotification} from "../../custom_hooks/useErrorNotification.ts";

type AddToBasketButtonProps = {
    product: Product,
}


export const AddToBasketButton = ({product}: AddToBasketButtonProps) => {

    const axiosPrivate = useAxiosPrivate();
    const basketContext = useContext(BasketContext);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const errorNotification = useErrorNotification();

    const handleDecreaseButton = () => {
        if (currentQuantity === 0) return;
        decrementQuantityApi()
            .then(() => {
                const updatedItems = basketContext.basket?.items.map(item => {
                    if (item.product.productId === product.productId) {
                        // Decrease the quantity by 1
                        return {...item, quantity: item.quantity - 1};
                    }
                    return item;
                });
                const newBasketItems = updatedItems?.filter(item => item.quantity > 0);
                basketContext.setBasket({...basketContext.basket, items: newBasketItems});
                setCurrentQuantity(currentQuantity - 1);
            })
            .catch((error) => {
                errorNotification(error.message)
            })
    }

    const handleIncreaseButton = () => {
        incrementQuantityApi()
            .then(() => {
                const newBasketItems = basketContext.basket.items.map(item => {
                    if (item.product.productId === product.productId) {
                        return {...item, quantity: item.quantity + 1}
                    }
                    return item;
                })
                basketContext.setBasket({...basketContext.basket, items: newBasketItems})
                setCurrentQuantity(currentQuantity + 1);
            })
    }

    const addToBasket = () => {
        if (currentQuantity === 0 && !loading) {
            incrementQuantityApi()
                .then(() => {
                    const basketPosition: BasketPosition = {
                        product: product,
                        quantity: 1,
                    }
                    const newItems = [...basketContext.basket.items, basketPosition];
                    basketContext.setBasket({...basketContext.basket, items: newItems})
                    setCurrentQuantity(1);
                })

        }
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

    const getPositionFromTheBasket = (productId: number) => {
        return basketContext.basket?.items.find(basketPosition =>
            basketPosition.product.productId === productId);
    }


    useEffect(() => {
        setCurrentQuantity(0);
        const basketPosition = getPositionFromTheBasket(product.productId);
        if (basketPosition) {
            setCurrentQuantity(basketPosition.quantity);
        }
    }, [product]);


    return (
        <div
            className={`${currentQuantity === 0 ? 'text-electron-primary-white bg-electron-primary-dark-blue cursor-pointer' : 'text-electron-header-font'}  justify-center items-center border border-electron-header-font shadow-md h-[48px] rounded-full flex gap-[12px] w-full lg:w-[130px]`}
            onClick={addToBasket}>

            {currentQuantity > 0 ?
                <>
                    <button className={"cursor-pointer h-full flex items-center pl-[14px]  rounded-l-full"}
                            disabled={loading}
                            onClick={handleDecreaseButton}>
                        <FaMinus size={20}/>
                    </button>
                    <div className="w-1/3 flex items-center justify-center">
                        <Bold textSize={18} weight={500}>
                            {currentQuantity}
                        </Bold>
                    </div>
                    <button className={"cursor-pointer h-full flex items-center pr-[14px]  rounded-r-full"}
                            disabled={loading}
                            onClick={handleIncreaseButton}>
                        <FaPlus size={20}/>
                    </button>
                </>
                :
                <div className="px-[35px]">
                    {product.stockQuantity > 0
                        ?
                        <button disabled={product.stockQuantity === 0}>Add</button>
                        :
                        <button>Out of stock</button>
                    }
                </div>
            }
        </div>
    )
}
