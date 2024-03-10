import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import React, {useContext, useEffect, useState} from "react";
import {Address} from "../../api/dto/auth/Address.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {useNavigate} from "react-router-dom";
import {CheckoutContext} from "../../context/CheckoutContext.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {CHECKOUT_ADDRESS_PICKER, CHECKOUT_ROUTE} from "../../constants/Routes.ts";
import {Header3} from "../reusable/Header3.tsx";
import {CiCreditCard1} from "react-icons/ci";
import {v4 as uuid4} from 'uuid';
import {
    defaultOrderRequestValidationError,
    OrderRequest,
    OrderRequestValidationError
} from "../../api/dto/order/OrderRequest.ts";
import {defaultPayment} from "../../api/dto/order/PaymentInformation.ts";
import {creditCard} from "../../api/dto/order/PaymentType.ts";
import {ORDER_API_PATH, PLACE_ORDER} from "../../api/axios.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {BasketContext} from "../../context/BasketContext.tsx";

export const CheckoutForm = () => {

    const checkoutContext = useContext(CheckoutContext);
    const basketContext = useContext(BasketContext);
    const [fullName, setFullName] = useState<string>('');
    const [deliveryAddress, setDeliveryAddress] = useState<Address>(checkoutContext.address);
    const [validationError, setValidationError] = useState<OrderRequestValidationError>(defaultOrderRequestValidationError);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [idempotencyKey, setIdempotencyKey] = useState<string>('')
    const messageScreen = useMessageScreen();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDeliveryAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    }

    const handleChangeAddressButton = () => {
        navigate(`${CHECKOUT_ROUTE}/${CHECKOUT_ADDRESS_PICKER}`);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        checkoutContext.setLoading(true);

        const orderRequest: OrderRequest = {
            idempotencyKey: {
                value: idempotencyKey,
            },
            paymentInformation: defaultPayment,
            deliveryAddress: {
                recipient: fullName,
                address: deliveryAddress
            },
            paymentType: creditCard,

        }
        console.log(orderRequest)

        axiosPrivate.post(ORDER_API_PATH + PLACE_ORDER, orderRequest)
            .then(result => {
                messageScreen("Your order has been placed with status: " + result.data.message);
                basketContext.setBasket({items: []})
            })
            .catch(error => {
                console.log(error)
                messageScreen("Something went wrong, check your validation.")
            })
            .finally(() => checkoutContext.setLoading(false));


    }

    useEffect(() => {
        console.log('call')
        setIdempotencyKey(uuid4())
        setValidationError(defaultOrderRequestValidationError);
    }, []);

    return (
        <form
            id="payForm"
            onSubmit={handleSubmit}
            className={"mt-[15px] flex flex-col"}>

            <div className="flex flex-col gap-[42px]">
                <Header3>Payment Method</Header3>
                <MultiInputHolder>
                    <div className="flex gap-2">
                        <CiCreditCard1 size={24}/>
                        <p>Credit Card</p>
                    </div>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={""}>First Name</Label>
                        <TextInput callback={() => {
                        }}
                                   type={"text"}
                                   value={'David'}
                                   required={true}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={""}>Last Name</Label>
                        <TextInput callback={() => {
                        }}
                                   type={"text"}
                                   value={'Jones'}
                                   required={true}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={""}>Credit Card Number</Label>
                        <TextInput callback={() => {
                        }}
                                   type={"text"}
                                   value={'1111-2222-3333-4444'}
                                   required={true}/>
                    </LabelInputHolder>
                    <div className="flex flex-col md:flex-row gap-5">
                        <LabelInputHolder>
                            <Label errorMessage={''} htmlFor={""}>Security code</Label>
                            <TextInput callback={() => {
                            }}
                                       type={"number"}
                                       value={123}
                                       placeholder={'123'}
                                       required={true}/>
                        </LabelInputHolder>
                        <LabelInputHolder>
                            <Label errorMessage={''} htmlFor={""}>Card Expiration</Label>
                            <TextInput callback={() => {
                            }}
                                       type={"text"}
                                       value={'11/11'}
                                       placeholder={'123'}
                                       required={true}/>
                        </LabelInputHolder>
                    </div>

                </MultiInputHolder>

                <div className="flex flex-col sm:flex-row gap-5 items-start justify-between">

                    <Header3>Delivery Address</Header3>
                    <div className="w-full sm:w-1/2" onClick={handleChangeAddressButton}>
                        <ElectronButton loading={checkoutContext.loading}>Your addresses</ElectronButton>
                    </div>
                </div>
                <MultiInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.deliveryAddress?.recipient} htmlFor={"fullName"}>Full
                            Name</Label>
                        <TextInput callback={handleFullNameChange}
                                   id={"fullName"}
                                   type={"text"}
                                   name={"fullName"}
                                   value={fullName}
                                   required={true}
                                   autoComplete={"full-name"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={"streetOne"}>Address 1</Label>
                        <TextInput callback={handleInputChange}
                                   id={"streetOne"}
                                   type={"text"}
                                   name={"streetOne"}
                                   value={deliveryAddress.streetOne}
                                   required={true}
                                   autoComplete={"address-line1"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={"streetTwo"}>Address 2</Label>
                        <TextInput callback={handleInputChange}
                                   id={"streetTwo"}
                                   type={"text"}
                                   name={"streetTwo"}
                                   value={deliveryAddress.streetTwo}
                                   required={true}
                                   autoComplete={"address-line2"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={"state"}>State</Label>
                        <TextInput callback={handleInputChange}
                                   id={"state"}
                                   type={"text"}
                                   name={"state"}
                                   value={deliveryAddress.state}
                                   required={true}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={"city"}>City</Label>
                        <TextInput callback={handleInputChange}
                                   id={"city"}
                                   type={"text"}
                                   name={"city"}
                                   value={deliveryAddress.city}
                                   required={true}
                                   autoComplete={"address-level2"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={''} htmlFor={"postcode"}>Postcode</Label>
                        <TextInput callback={handleInputChange}
                                   id={"postcode"}
                                   type={"text"}
                                   name={"postcode"}
                                   value={deliveryAddress.postcode}
                                   required={true}
                                   autoComplete="postal-code"/>
                    </LabelInputHolder>
                </MultiInputHolder>
            </div>

        </form>
    )
}