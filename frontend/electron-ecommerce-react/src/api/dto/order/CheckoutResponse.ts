import {Product} from "../product/Product.ts";

export type CheckoutResponse = {
    products: Product[],
    orderTotalPrice: number,
    totalItems: number,
}

export const checkoutResponseDefault: CheckoutResponse = {
    products: [],
    orderTotalPrice: 0,
    totalItems: 0,
}