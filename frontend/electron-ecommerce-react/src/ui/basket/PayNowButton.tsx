import {CgSpinner} from "react-icons/cg";
import {CiCreditCard1} from "react-icons/ci";
import {useContext} from "react";
import {CheckoutContext} from "../../context/CheckoutContext.tsx";



export const PayNowButton = () => {
    const checkoutContext = useContext(CheckoutContext);


    return (
        <div >
            <div className={"flex flex-col mb-3"}>
                <button form="payForm" type="submit"
                    className={"text-black shadow-md p-[14px] h-[48px] rounded-full font-[600] "
                        + `${checkoutContext.loading ? "bg-electron-pay " : "bg-electron-pay "}`}
                    disabled={checkoutContext.loading}>

                    <div className="w-full items-center justify-center flex">
                        <div className={`${checkoutContext.loading ? "animate-spin " : 'hidden '} h-[24px] w-[24px]`}>
                            <CgSpinner size={24}/>
                        </div>
                    </div>
                    <div className={`${checkoutContext.loading ? "hidden" : ''}`}>
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