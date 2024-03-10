import {Link} from "react-router-dom";
import {ACCOUNT_ROUTE, ADD_ADDRESS_NESTED_ROUTE} from "../../constants/Routes.ts";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {useEffect, useState} from "react";
import {ADDRESS_API_PATH, GET_ALL} from "../../api/axios.ts";
import {Address} from "../../api/dto/auth/Address.ts";
import {Header3} from "../reusable/Header3.tsx";
import {AddressEl} from "./AddressEl.tsx";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const AccountAddresses = () => {
    const axiosPrivate = useAxiosPrivate();
    const [addresses, setAddresses] = useState<Address[]>([]);

    useScrollToTop();

    useEffect(() => {
        axiosPrivate.get(ADDRESS_API_PATH + GET_ALL)
            .then(response => {
                setAddresses(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className="flex flex-col gap-[24px]">
            <Header3>Addresses</Header3>
            <div className="grid md:grid-cols-2 gap-[20px]">
                {addresses.map((item, key) => (
                    <div key={key}>
                        <AddressEl address={item}/>
                    </div>
                ))}
            </div>
            <Link to={ACCOUNT_ROUTE + "/" + ADD_ADDRESS_NESTED_ROUTE}>
                <ElectronButton>Add address</ElectronButton>
            </Link>

        </div>
    )
}