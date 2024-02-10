import {Feature} from "./Feature.ts";

export type Product = {
    productId: number,
    name: string,
    description: string,
    sku: string,
    imgUrl: string,
    stockQuantity: number,
    price: number,
    currentRate: number,
    categoryId: number,
    category: string,
    productInformation: string,
    images: string[],
    features: Feature[];
}

export const defaultProduct: Product = {
    productId: 0,
    name: '',
    description: '',
    sku: '',
    imgUrl: '',
    stockQuantity:0,
    price:0,
    currentRate:0,
    categoryId:0,
    category:'',
    productInformation:'',
    images: [],
    features: [],
}




