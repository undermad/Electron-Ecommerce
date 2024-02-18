import {Container} from "../reusable/Container.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {CiUser} from "react-icons/ci";
import {Bold} from "../reusable/Bold.tsx";
import {Span} from "../reusable/Span.tsx";
import LogoutEverywhereButton from "../auth/LogoutEverywhereButton.tsx";
import {HoverScale} from "../reusable/HoverScale.tsx";
import React from "react";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";

export const MyAccount = () => {

    return (
        <Container>
            <div className="flex gap-[42px]">
                <div className="w-2/6 flex flex-col gap-[24px]">
                    <Header3>Your account</Header3>


                    <main className="p-[24px] border border-electron-product-listing-bg rounded-lg">
                        <div className="flex items-center gap-[12px] mb-[17px]">
                            <div
                                className={"w-[95px] h-[95px] flex justify-center items-center rounded-full border border-electron-product-listing-bg"}>
                                <CiUser color="#2f2f2f" size={50}/>
                            </div>
                            <Bold weight={600} textSize={14}>Dominik Tworek</Bold>
                        </div>
                        <div className="flex flex-col gap-[17px] pt-[17px]">
                            <HoverScale>
                                <div className="cursor-pointer flex justify-between items-center">
                                    <Span>Payment Information</Span>
                                    <MdOutlineKeyboardArrowRight/>
                                </div>
                            </HoverScale>
                            <HoverScale>
                                <Span>Addresses</Span>
                            </HoverScale>
                            <HoverScale>
                                <Span>Change Password</Span>
                            </HoverScale>
                            <HoverScale>
                                <LogoutEverywhereButton/>
                            </HoverScale>

                        </div>
                    </main>

                </div>
                <div className="w-4/6">
                    asd
                </div>
            </div>
        </Container>
    )


}