import {MultiInputHolder} from "../reusable/MultiInputHolder.tsx";
import {LabelInputHolder} from "../reusable/LabelInputHolder.tsx";
import {Label} from "../reusable/Label.tsx";
import {TextInput} from "../reusable/TextInput.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import React, {useState} from "react";
import {Address, AddressValidationError, defaultAddress} from "../../api/dto/auth/Address.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {ADD, ADDRESS_API_PATH} from "../../api/axios.ts";
import {useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE, ADDRESSES_NESTED_ROUTE} from "../../constants/Routes.ts";

const validationErrorInit: AddressValidationError = {
    ...defaultAddress,
    message: '',
}

export const AddAddressForm = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [newAddress, setNewAddress] = useState<Address>(defaultAddress);
    const [validationError, setValidationError] = useState<AddressValidationError>(validationErrorInit);
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const address: Address = newAddress;
        axiosPrivate.post(ADDRESS_API_PATH + ADD, address)
            .then(() => navigate(ACCOUNT_ROUTE + "/" + ADDRESSES_NESTED_ROUTE))
            .catch(error => {
                setValidationError({...error.response.data})
                setLoading(false);
            })

    }

    return (
        <form
            className={"mt-[35px] flex flex-col"}
            onSubmit={handleSubmit}>

            <MultiInputHolder>
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
            <ElectronButton loading={loading}>Add Address</ElectronButton>


        </form>
    )
}