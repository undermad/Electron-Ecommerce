export type ChangeForgottenPasswordRequest = {
    newPassword: string;
    reNewPassword: string;
}

export type ChangeForgottenPasswordRequestError = ChangeForgottenPasswordRequest & {
    message: string,
}