import {PriceRange} from "../../../ui/model/PriceRange.ts";

export type ProductWithFilterRequest = {
    filters: { [key: string]: string[] },
    priceRange: PriceRange,
}