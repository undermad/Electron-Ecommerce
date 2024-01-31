
export type RegisterRequest = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string,
    newsletterSubscription: boolean,
}

export type RegisterRequestValidationError = RegisterRequest & {
    message: string,
}

