import {useEffect, useState} from "react";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {GET_ALL, ORDER_API_PATH} from "../../api/axios.ts";
import {Header3} from "../reusable/Header3.tsx";
import {Bold} from "../reusable/Bold.tsx";
import {OrderResponse} from "../../api/dto/order/OrderResponse.ts";
import {OrderItemEl} from "./OrderItemEl.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const AccountOrders = () => {

    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const axiosPrivate = useAxiosPrivate();

    useScrollToTop();

    useEffect(() => {
        axiosPrivate.get(ORDER_API_PATH + GET_ALL)
            .then(response => {
                console.log(response.data)
                setOrders(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className="flex flex-col gap-[24px]">
            <Header3>Orders</Header3>
            {orders.length === 0 ?
                <ParagraphSmall>Your order list is empty. Be a hero and change it right now!</ParagraphSmall>
                :
                <div className="flex flex-col gap-14 ">
                    {orders.map((value, index) => (
                        <div key={index}
                             className="flex flex-col gap-[24px] border border-electron-product-listing-bg rounded-md p-[24px]">
                            <div className="w-full flex items-center justify-between">
                                <Bold weight={500} textSize={16}>Order Status</Bold>
                                <div
                                    className="text-electron-green border border-electron-input-grey rounded-full p-[8px] md:p-[12px] w-[120px] md:w-[150px] flex justify-center bg-electron-very-light-green">
                                    {value.status}
                                </div>
                            </div>
                            <div className="border-t border-electron-product-listing-bg pt-[17px]">
                                <OrderItemEl items={value.orderItems}/>
                            </div>
                            <div className="border-t border-electron-product-listing-bg pt-[17px]">
                                <ParagraphSmall>{value.fullName}</ParagraphSmall>
                                <ParagraphSmall>{value.streetOne}</ParagraphSmall>
                                <ParagraphSmall>{value.streetTwo}</ParagraphSmall>
                                <ParagraphSmall>{value.state}</ParagraphSmall>
                                <ParagraphSmall>{value.city}</ParagraphSmall>
                                <ParagraphSmall>{value.postcode}</ParagraphSmall>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
