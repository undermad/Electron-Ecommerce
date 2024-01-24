export type PasswordRecoveryRequest ={
    email: string;
}

export type PasswordRecoveryRequestError = PasswordRecoveryRequest & {
    message: string,
}