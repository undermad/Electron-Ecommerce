import {Container} from "../reusable/Container.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {CiUser} from "react-icons/ci";
import {Bold} from "../reusable/Bold.tsx";
import LogoutEverywhereButton from "../auth/LogoutEverywhereButton.tsx";
import {HoverScale} from "../reusable/HoverScale.tsx";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import {Outlet, useNavigate} from "react-router-dom";
import {AccountLink} from "./AccountLink.tsx";
import {
    ADDRESSES_NESTED_ROUTE,
    CHANGE_PASSWORD_NESTED_ROUTE, ORDER_NESTED_ROUTE,
    PAYMENT_INFORMATION_NESTED_ROUTE
} from "../../constants/Routes.ts";
import {useEffect} from "react";

export const MyAccount = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(ORDER_NESTED_ROUTE);
    }, []);

    return (
        <Container>
            <div className="flex flex-col lg:flex-row gap-[42px]">
                <div className="lg:w-2/6 flex flex-col gap-[24px]">
                    <Header3>Your account</Header3>


                    <main className="p-[24px] border border-electron-product-listing-bg rounded-lg">
                        <div className="flex items-center gap-[12px] mb-[17px]">
                            <div
                                className={"w-[95px] h-[95px] flex justify-center items-center rounded-full border border-electron-product-listing-bg"}>
                                <CiUser color="#2f2f2f" size={50}/>
                            </div>
                            <Bold weight={600} textSize={14}>Dominik Tworek</Bold>
                        </div>
                        <nav className="flex flex-col gap-[17px] pt-[17px]">
                            <AccountLink route={ORDER_NESTED_ROUTE} displayText={"Orders"}/>
                            <AccountLink displayText="Addresses" route={ADDRESSES_NESTED_ROUTE}/>
                            <AccountLink displayText="Payment Information" route={PAYMENT_INFORMATION_NESTED_ROUTE}/>
                            <AccountLink displayText="Change Password" route={CHANGE_PASSWORD_NESTED_ROUTE}/>
                            <HoverScale>
                                <div className="cursor-pointer flex justify-between items-center">
                                    <LogoutEverywhereButton/>
                                    <MdOutlineKeyboardArrowRight/>
                                </div>
                            </HoverScale>

                        </nav>
                    </main>

                </div>
                <div className="lg:w-4/6">
                    <Outlet/>
                </div>
            </div>
        </Container>
    )


}