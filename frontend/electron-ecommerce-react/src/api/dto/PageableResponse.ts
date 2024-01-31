export type PageableResponse<T> = {
    pageNo: number,
    totalPages: number,
    totalElements: number,
    pageSize: number,
    content: T[],
}