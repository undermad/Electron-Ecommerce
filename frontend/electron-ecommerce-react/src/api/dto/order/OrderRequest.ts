import {Address} from "../auth/Address.ts";
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

