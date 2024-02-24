import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Address, AddressValidationError, defaultAddress} from "../../api/dto/auth/Address.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {useNavigate} from "react-router-dom";
import {CheckoutContext} from "../../context/CheckoutContext.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {CHECKOUT_ADDRESS_PICKER, CHECKOUT_ROUTE} from "../../constants/Routes.ts";
import {Header3} from "../reusable/Header3.tsx";
import {CiCreditCard1} from "react-icons/ci";
import {v4 as uuid4} from 'uuid';


const validationErrorInit: AddressValidationError = {
    ...defaultAddress,
    message: '',
}

export const CheckoutForm = () => {

    const checkoutContext = useContext(CheckoutContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>('');
    const [newAddress, setNewAddress] = useState<Address>(defaultAddress);
    const [validationError, setValidationError] = useState<AddressValidationError>(validationErrorInit);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const idempotencyKey = uuid4();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewAddress((prevState) => ({
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

    const handleSubmit = () => {
        setLoading(true);
        console.log('clicked')
        console.log(idempotencyKey)
    }


    useEffect(() => {
        console.log('call')
        setNewAddress(checkoutContext.address);
        checkoutContext.setFormSubmit(() => handleSubmit)
    }, []);


    return (
        <form
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

                <div className="flex items-center justify-between">

                    <Header3>Delivery Address</Header3>
                    <div className="w-1/2" onClick={handleChangeAddressButton}>
                        <ElectronButton loading={loading}>Your addresses</ElectronButton>
                    </div>
                </div>
                <MultiInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.streetOne} htmlFor={"fullName"}>Full Name</Label>
                        <TextInput callback={handleFullNameChange}
                                   id={"fullName"}
                                   type={"text"}
                                   name={"fullName"}
                                   value={fullName}
                                   required={true}
                                   autoComplete={"full-name"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.streetOne} htmlFor={"streetOne"}>Address 1</Label>
                        <TextInput callback={handleInputChange}
                                   id={"streetOne"}
                                   type={"text"}
                                   name={"streetOne"}
                                   value={newAddress.streetOne}
                                   required={true}
                                   autoComplete={"address-line1"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.streetTwo} htmlFor={"streetTwo"}>Address 2</Label>
                        <TextInput callback={handleInputChange}
                                   id={"streetTwo"}
                                   type={"text"}
                                   name={"streetTwo"}
                                   value={newAddress.streetTwo}
                                   required={true}
                                   autoComplete={"address-line2"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.state} htmlFor={"state"}>State</Label>
                        <TextInput callback={handleInputChange}
                                   id={"state"}
                                   type={"text"}
                                   name={"state"}
                                   value={newAddress.state}
                                   required={true}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.city} htmlFor={"city"}>City</Label>
                        <TextInput callback={handleInputChange}
                                   id={"city"}
                                   type={"text"}
                                   name={"city"}
                                   value={newAddress.city}
                                   required={true}
                                   autoComplete={"address-level2"}/>
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <Label errorMessage={validationError.postcode} htmlFor={"postcode"}>Postcode</Label>
                        <TextInput callback={handleInputChange}
                                   id={"postcode"}
                                   type={"text"}
                                   name={"postcode"}
                                   value={newAddress.postcode}
                                   required={true}
                                   autoComplete="postal-code"/>
                    </LabelInputHolder>
                </MultiInputHolder>


            </div>

        </form>
    )
}