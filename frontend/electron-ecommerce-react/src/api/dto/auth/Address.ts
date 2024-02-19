export type Address = {
    id: number,
    streetOne: string,
    streetTwo: string,
    city: string,
    state: string,
    postcode: string,
}

export const defaultAddress: Address = {
    id: 0,
    streetOne: '',
    streetTwo: '',
    city: '',
    state: '',
    postcode: '',
}

export type AddressValidationError = Address & {
    message: string,
}