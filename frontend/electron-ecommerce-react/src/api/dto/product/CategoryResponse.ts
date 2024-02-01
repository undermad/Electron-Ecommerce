
export type CategoryResponse = {
    name: string | undefined;
    filters: Map<string, string[]>,
    maxPrice: number | undefined;
}