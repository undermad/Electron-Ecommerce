import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {useContext, useEffect, useState} from "react";
import {Address} from "../../api/dto/auth/Address.ts";
import {ADDRESS_API_PATH, GET_ALL} from "../../api/axios.ts";
import {AddressEl} from "../account/AddressEl.tsx";
import {CheckoutContext} from "../../context/CheckoutContext.tsx";
import {useNavigate} from "react-router-dom";
import {CHECKOUT_ORDER_INFO, CHECKOUT_ROUTE} from "../../constants/Routes.ts";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";
import {useErrorNotification} from "../../custom_hooks/useErrorNotification.ts";

export const AddressPicker = () => {
    const axiosPrivate = useAxiosPrivate();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const checkoutContext = useContext(CheckoutContext);
    const navigate = useNavigate();
    const errorNotification = useErrorNotification();

    useScrollToTop();

    useEffect(() => {
        axiosPrivate.get(ADDRESS_API_PATH + GET_ALL)
            .then(response => {
                setAddresses(response.data)
            })
            .catch(error => {
                errorNotification(error?.response?.data);
            })
    }, []);

    const handleAddressClick = (address: Address) => {
        checkoutContext.setAddress(address);
        navigate(`${CHECKOUT_ROUTE}/${CHECKOUT_ORDER_INFO}`)
    }


    return (

        <div className="grid md:grid-cols-2 gap-[20px]">
            {addresses.map((item, key) => (
                <AddressEl
                    onClick={() => handleAddressClick(item)}
                    key={key}
                    address={item}/>
            ))}
        </div>
    )
}