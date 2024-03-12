import {Container} from "../reusable/Container.tsx";
import {CheckoutResponse, checkoutResponseDefault} from "../../api/dto/order/CheckoutResponse.ts";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {GET_CHECKOUT_SUMMARY, CHECKOUT_API_PATH} from "../../api/axios.ts";
import {Header2} from "../reusable/Header2.tsx";
import {TotalSummary} from "./TotalSummary.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {PayNowButton} from "./PayNowButton.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {CheckoutContextProvider} from "../../context/CheckoutContext.tsx";
import {BASKET_ROUTE, CHECKOUT_ORDER_INFO} from "../../constants/Routes.ts";
import {motion} from "framer-motion";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

export const Checkout = () => {

    const axiosPrivate = useAxiosPrivate();
    const [checkout, setCheckout] = useState<CheckoutResponse>(checkoutResponseDefault);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<boolean>(false);



    useEffect(() => {
        axiosPrivate.get(CHECKOUT_API_PATH + GET_CHECKOUT_SUMMARY)
            .then(response => {
                setCheckout(response.data);
                navigate(CHECKOUT_ORDER_INFO)
            })
            .catch(error => {
                if (error.response.status === 404)
                    navigate(BASKET_ROUTE);
            })
    }, []);

    const expand = () => {

        setExpanded(!expanded);
    }


    return (
        <Container>
            <CheckoutContextProvider>
                <div className="flex flex-col gap-[24px] relative">
                    <Header3>Payment details and delivery address</Header3>
                    <div className="flex gap-[42px]">
                        <div className="flex flex-col gap-[20px] w-full lg:w-2/3">
                            <Outlet/>


                        </div>
                        <div className="hidden lg:block lg:static lg:w-1/3">
                            <div className=" p-[24px] border border-electron-product-listing-bg rounded-lg">
                                <div className="mb-[17px] border-b border-electron-product-listing-bg">
                                    <Header2>Order Summary</Header2>
                                </div>
                                <div
                                    className="border-b border-electron-product-listing-bg flex flex-col gap-2 pb-1 h-[150px] overflow-y-auto">
                                    {checkout.products.map((value, index) => (
                                        <div className="flex"
                                             key={index}>
                                            <div className="flex gap-[12px]">
                                                <img className={"w-1/4"}
                                                     src={value.imgUrl} alt={value.description}/>
                                                <div className="">
                                                <span
                                                    className="font-[600] text-[14px] line-clamp-1">{value.name}</span>
                                                    <ParagraphSmall>Quantity: {value.totalQuantity}</ParagraphSmall>
                                                    <span
                                                        className="font-[600] text-[14px]">£ {(value.price * value.totalQuantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <TotalSummary totalItems={checkout.totalItems} totalPrice={checkout.orderTotalPrice}/>
                            </div>

                            <div className="mt-[17px]">
                                <PayNowButton/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed left-0 bg-electron-primary-white bottom-0 w-full lg:hidden z-50">
                    <div className=" px-[24px] pb-[24px] border border-electron-product-listing-bg rounded-lg">
                        <div
                            onClick={expand}
                            className="relative py-[17px] border-b border-electron-product-listing-bg items-">
                            <Header2>TOTAL</Header2>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                {expanded ?
                                    <IoIosArrowDown/>
                                    :
                                    <IoIosArrowUp/>
                                }
                            </div>
                        </div>
                        <motion.div
                            animate={{
                                height: expanded ? 150 : 0,
                                display: expanded ? "flex" : "flex"
                            }}
                            initial={{
                                height: 0,
                            }}

                            transition={{type: "tween", duration: 0.25}}
                            className={`hidden border-b border-electron-product-listing-bg flex-col gap-2 pb-1 overflow-y-auto h-[150px]`}>
                            {checkout.products.map((value, index) => (
                                <div className="flex"
                                     key={index}>
                                    <div className="flex gap-[12px]">
                                        <img className={"w-1/4"}
                                             src={value.imgUrl} alt={value.description}/>
                                        <div className="">
                                            <span className="font-[600] text-[14px] line-clamp-1">{value.name}</span>
                                            <ParagraphSmall>Quantity: {value.totalQuantity}</ParagraphSmall>
                                            <span
                                                className="font-[600] text-[14px]">£ {(value.price * value.totalQuantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                        <TotalSummary totalItems={checkout.totalItems} totalPrice={checkout.orderTotalPrice}/>
                    </div>
                    <div className="mt-[17px]">
                        <PayNowButton/>
                    </div>
                </div>
            </CheckoutContextProvider>
        </Container>
    )
}
