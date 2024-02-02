import {PriceRange} from "./PriceRange.ts";

export type ProductWithFilterRequest = {
    filters: { [key: string]: string[] },
    priceRange: PriceRange,
}