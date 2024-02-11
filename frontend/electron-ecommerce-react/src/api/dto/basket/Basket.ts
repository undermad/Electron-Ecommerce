import {Product} from "../product/Product.ts";

export type BasketPosition = {
    product: Product,
    quantity: number,
}

export type Basket = {
    items: BasketPosition[]
}