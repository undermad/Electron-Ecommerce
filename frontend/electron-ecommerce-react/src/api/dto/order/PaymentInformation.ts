export type PaymentInformation = {
    firstName: string,
    lastName: string,
    cardNumber: string,
    ccv: number,
    expiryDate: string,
}


export const defaultPayment: PaymentInformation = {
    firstName: 'David',
    lastName: 'Jones',
    cardNumber: '1111-2222-3333-4444',
    expiryDate: '11/11',
    ccv: 123
}
