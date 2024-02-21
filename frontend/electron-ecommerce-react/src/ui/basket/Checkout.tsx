import {Container} from "../reusable/Container.tsx";
import {CheckoutResponse, checkoutResponseDefault} from "../../api/dto/order/CheckoutResponse.ts";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {GET_CHECKOUT_SUMMARY, ORDER_API_PATH} from "../../api/axios.ts";
import {Header2} from "../reusable/Header2.tsx";
import {TotalSummary} from "./TotalSummary.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {PlaceOrderButton} from "./PlaceOrderButton.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";

export const Checkout = () => {

    const axiosPrivate = useAxiosPrivate();
    const [checkout, setCheckout] = useState<CheckoutResponse>(checkoutResponseDefault);


    useEffect(() => {
        axiosPrivate.get(ORDER_API_PATH + GET_CHECKOUT_SUMMARY)
            .then(response => {
                setCheckout(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <Container>
            <div className="flex flex-col gap-[24px] relative">
                <Header3>Billing and addresses</Header3>
                <div className="flex gap-[42px]">
                    <div className="flex flex-col gap-[20px] w-full lg:w-2/3">


                    </div>
                    <div className="hidden lg:block lg:static lg:w-1/3">
                        <div className=" p-[24px] border border-electron-product-listing-bg rounded-lg">
                            <div className="mb-[17px] border-b border-electron-product-listing-bg">
                                <Header2>Order Summary</Header2>
                            </div>
                            <div className="border-b border-electron-product-listing-bg flex flex-col gap-2 pb-1 h-[150px] overflow-y-auto">
                                {checkout.products.map((value, index) => (
                                    <div className="flex"
                                         key={index}>
                                        <div className="flex gap-[12px]">
                                            <img className={"w-1/4"}
                                                 src={value.imgUrl} alt={value.description}/>
                                            <div className="">
                                                <span className="font-[600] text-[14px] line-clamp-1">{value.name}</span>
                                                <ParagraphSmall>Quantity: {value.totalQuantity}</ParagraphSmall>
                                                <span className="font-[600] text-[14px]">£ {value.price * value.totalQuantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <TotalSummary totalItems={checkout.totalItems} totalPrice={checkout.orderTotalPrice}/>
                        </div>

                        <div className="mt-[17px]">
                            <PlaceOrderButton/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed left-0 bg-electron-primary-white bottom-0 w-full lg:hidden">
                <div className=" p-[24px] border border-electron-product-listing-bg rounded-lg">
                    <div className="mb-[17px] border-b border-electron-product-listing-bg">
                        <Header2>TOTAL</Header2>
                    </div>
                    <div className="border-b border-electron-product-listing-bg flex flex-col gap-2 pb-1 overflow-y-auto h-[150px]">
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
                                            className="font-[600] text-[14px]">£ {value.price * value.totalQuantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <TotalSummary totalItems={checkout.totalItems} totalPrice={checkout.orderTotalPrice}/>
                </div>
                <div className="mt-[17px]">
                    <PlaceOrderButton/>
                </div>
            </div>


        </Container>
    )
}