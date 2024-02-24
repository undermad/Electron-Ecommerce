import {Address} from "../auth/Address.ts";
import {BasketPosition} from "../basket/Basket.ts";
import {IdempotencyKey} from "./IdempotencyKey.ts";
import {PaymentInformation} from "./PaymentInformation.ts";

export type OrderRequest = {
    paymentInformation: PaymentInformation,
    deliveryAddress: {
        recipient: string,
        address: Address
    },
    idempotencyKey: IdempotencyKey,
    basket: BasketPosition[],
}

