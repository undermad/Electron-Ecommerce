
export type CategoryResponse = {
    name: string;
    filters: { [key: string]: string[] },
    maxPrice: number;
}