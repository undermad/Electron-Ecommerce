import {OrderItemDto} from "./OrderItemDto.ts";

export type OrderResponse = {
    status: string,
    totalItems: number,
    totalPrice: number,
    fullName: string,
    streetOne: string,
    streetTwo: string,
    city: string,
    state: string,
    postcode: string,
    orderItems: OrderItemDto[],
}