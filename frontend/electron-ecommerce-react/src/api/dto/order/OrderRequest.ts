import {Address, defaultAddress} from "../auth/Address.ts";
import {IdempotencyKey} from "./IdempotencyKey.ts";
import {PaymentInformation} from "./PaymentInformation.ts";
import {PaymentType} from "./PaymentType.ts";

export type OrderRequest = {
    paymentInformation: PaymentInformation,
    deliveryAddress: {
        recipient: string,
        address: Address
    },
    idempotencyKey: IdempotencyKey,
    paymentType: PaymentType,
}


export type OrderRequestValidationError = OrderRequest & {
    message: string
}

export const defaultOrderRequestInit: OrderRequest = {
    paymentInformation: {
        firstName: '',
        lastName: '',
        cardNumber: '',
        ccv: 0,
        expiryDate: '',
    },
    deliveryAddress: {
        recipient: '',
        address: defaultAddress,
    },
    idempotencyKey: {
        value: ''
    },
    paymentType: {
        value: "CreditCard"
    }
}

export const defaultOrderRequestValidationError: OrderRequestValidationError = {
    ...defaultOrderRequestInit,
    message: ''
}
