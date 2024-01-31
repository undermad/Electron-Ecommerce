export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginRequestError = LoginRequest & {
    message: string,
}