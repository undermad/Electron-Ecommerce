import React, {createContext, useState} from "react";
import {ProductDto} from "../api/dto/product/ProductDto.ts";

type ProductListContextProps = {
    children: React.ReactNode;
}

type ProductListContextType = {
    productList: ProductDto[] | null,
    setProductList: React.Dispatch<React.SetStateAction<ProductDto[] | null>>,
}

export const ProductListContext = createContext<ProductListContextType | null>(null);

export const ProductListContextProvider = ({children}: ProductListContextProps) => {
    const [productList, setProductList] = useState<ProductDto[] | null>(null);

    return <ProductListContext.Provider value={{productList, setProductList}}>{children}</ProductListContext.Provider>
}