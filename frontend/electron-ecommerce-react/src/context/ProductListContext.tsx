import React, {createContext, useState} from "react";
import {Product} from "../api/dto/product/Product.ts";
import {PageableResponse} from "../api/dto/PageableResponse.ts";

type ProductListContextProps = {
    children: React.ReactNode;
}

type ProductListContextType = {
    pageableProductList: PageableResponse<Product> | null,
    setPageableProductList: React.Dispatch<React.SetStateAction<PageableResponse<Product> | null>>,
}

export const ProductListContext = createContext<ProductListContextType | null>(null);

export const ProductListContextProvider = ({children}: ProductListContextProps) => {
    const [pageableProductList, setPageableProductList] = useState<PageableResponse<Product> | null>(null);

    return <ProductListContext.Provider value={{pageableProductList, setPageableProductList}}>{children}</ProductListContext.Provider>
}