export type LoginResponse = {
    token?: string,
    tokenType?: string,
    roles?: string[],
    accountStatus?: string,
}