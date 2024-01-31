export type ProductWithFilterRequest = {
    filters: { [key: string]: string[] },
    minPrice: number,
    maxPrice: number,
    category: string | undefined,
}