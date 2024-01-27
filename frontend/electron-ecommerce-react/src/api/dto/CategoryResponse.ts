import {ProductDto} from "./ProductDto.ts";
import {FiltersDto} from "./FiltersDto.ts";

export type CategoryResponse = {
    name: string;
    filters: FiltersDto,
    maxPrice: number;
    productDto: ProductDto[];
}