import React, {createContext, useState} from "react";
import {Product} from "../api/dto/product/Product.ts";
import {PageableResponse} from "../api/dto/PageableResponse.ts";
import {CategoryResponse} from "../api/dto/product/CategoryResponse.ts";

type ProductContextProps = {
    children: React.ReactNode;
}

type ProductContextType = {
    pageableProductList: PageableResponse<Product> | null,
    setPageableProductList: React.Dispatch<React.SetStateAction<PageableResponse<Product> | null>>,
    filters: Map<string, string[]> | null,
    setFilters: React.Dispatch<React.SetStateAction<Map<string, string[]> | null>>,
    categoryResponse: CategoryResponse,
    setCategoryResponse: React.Dispatch<React.SetStateAction<CategoryResponse>>,
    priceValues: number[];
    setPriceValues: React.Dispatch<React.SetStateAction<number[]>>;
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>,
    sortDirection: string,
    setSortDirection: React.Dispatch<React.SetStateAction<string>>,
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductContextProvider = ({children}: ProductContextProps) => {
    const [pageableProductList, setPageableProductList] = useState<PageableResponse<Product> | null>({
        pageNo: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 25,
        content: [],
    });
    const [filters, setFilters] = useState<Map<string, string[]> | null>(null);
    const [categoryResponse, setCategoryResponse] = useState<CategoryResponse>({
        name: '',
        filters: new Map<string, string[]>,
        maxPrice: 1,
    })
    const [priceValues, setPriceValues] = useState<number[]>([0, 1]);
    const [sortBy, setSortBy] = useState<string>('relevance');
    const [sortDirection, setSortDirection] = useState<string>('ASC');
    const [query, setQuery] = useState<string>('');

    return <ProductContext.Provider value={{
        pageableProductList, setPageableProductList,
        filters, setFilters,
        categoryResponse, setCategoryResponse,
        priceValues, setPriceValues,
        sortBy, setSortBy,
        sortDirection, setSortDirection,
        query, setQuery
    }}>{children}</ProductContext.Provider>
}