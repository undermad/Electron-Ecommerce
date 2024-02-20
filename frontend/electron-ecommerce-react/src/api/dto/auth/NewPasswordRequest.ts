export type NewPasswordRequest = {
    oldPassword: string,
    newPassword: string,
    reNewPassword: string,
}

export const newPasswordRequestDefault: NewPasswordRequest = {
    oldPassword: '',
    newPassword: '',
    reNewPassword: ''
}

export type NewPasswordRequestError = NewPasswordRequest & {
    message: string,
}

export const newPasswordRequestErrorDefault: NewPasswordRequestError = {
    ...newPasswordRequestDefault,
    message: '',
}