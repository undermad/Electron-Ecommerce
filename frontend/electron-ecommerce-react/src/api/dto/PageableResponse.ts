export type PageableResponse<T> = {
    pageNo: number,
    totalPages: number,
    totalElements: number,
    pageSize: number,
    content: T[],
}

export const defaultPageableProduct = {
    pageNo: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 25,
    content: [],
}