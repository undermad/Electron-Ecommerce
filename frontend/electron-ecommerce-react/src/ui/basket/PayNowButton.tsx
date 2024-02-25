import {CgSpinner} from "react-icons/cg";
import {useContext, useState} from "react";
import {CiCreditCard1} from "react-icons/ci";
import {CheckoutContext} from "../../context/CheckoutContext.tsx";

export const PayNowButton = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const checkoutContext = useContext(CheckoutContext);

    const handleClick = () => {
        setLoading(true)
        checkoutContext.formSubmit();
        setLoading(false);
    };





    return (
        <div onClick={handleClick}>
            <div className={"flex flex-col"}>
                <button type="submit"
                    className={"text-black shadow-md p-[14px] h-[48px] rounded-full font-[600] "
                        + `${loading ? "bg-electron-pay " : "bg-electron-pay "}`}
                    disabled={loading}>

                    <div className="w-full items-center justify-center flex">
                        <div className={`${loading ? "animate-spin " : 'hidden '} h-[24px] w-[24px]`}>
                            <CgSpinner size={24}/>
                        </div>
                    </div>
                    <div className={`${loading ? "hidden" : ''}`}>
                        <div className="flex gap-2 justify-center">
                            <div className="relative">
                                Pay Now
                            <div className="absolute left-0 top-0 -translate-x-7">
                                <CiCreditCard1 size={24}/>
                            </div>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}