import {Span} from "../reusable/Span.tsx";
import {CiEdit} from "react-icons/ci";
import {AiOutlineDelete} from "react-icons/ai";
import {Address} from "../../api/dto/auth/Address.ts";
import {useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE, DELETE_ADDRESS_NESTED_ROUTE, UPDATE_ADDRESS_NESTED_ROUTE} from "../../constants/Routes.ts";

type AddressElProps = {
    address: Address,
}

export const AddressEl = ({address}: AddressElProps) => {

    const navigate = useNavigate();

    const handleEditButton = () => {
        navigate(ACCOUNT_ROUTE + "/" + UPDATE_ADDRESS_NESTED_ROUTE + "/" + address.id)
    }

    const handleDeleteButton = () => {
        navigate(ACCOUNT_ROUTE + "/" + DELETE_ADDRESS_NESTED_ROUTE + "/" + address.id);
    }


    return (
        <div className="flex justify-between p-[17px] border border-electron-product-listing-bg rounded-lg">
            <div
                className="flex flex-col gap-[6px] ">
                <Span>{address.streetOne}</Span>
                <Span>{address.streetTwo}</Span>
                <Span>{address.state}</Span>
                <Span>{address.city}</Span>
                <Span>{address.postcode}</Span>
            </div>
            <div className="flex flex-col justify-between">
                <div className="cursor-pointer"
                    onClick={handleEditButton}>
                    <CiEdit size={24}/>
                </div>
                <div className="cursor-pointer"
                    onClick={handleDeleteButton}>
                    <AiOutlineDelete size={24}/>
                </div>
            </div>
        </div>
    )
}