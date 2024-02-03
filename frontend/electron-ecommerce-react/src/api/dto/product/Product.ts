export type Product = {
    productId: number,
    name: string,
    description: string,
    sku: string,
    imgUrl: string,
    stockQuantity: number,
    price: number,
    categoryId: number,
    features: string[];
}


export const defaultPageableProduct = {
    pageNo: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 25,
    content: [],
}

