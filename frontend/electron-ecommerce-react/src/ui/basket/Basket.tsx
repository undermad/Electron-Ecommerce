import {BasketPositionsList} from "./BasketPositionsList.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {Container} from "../reusable/Container.tsx";
import {BasketTotal} from "./BasketTotal.tsx";
import {BeginCheckout} from "./BeginCheckout.tsx";
import { useEffect, useState} from "react";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";
import {DELETE, CHECKOUT_API_PATH} from "../../api/axios.ts";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const Basket = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();


    useScrollToTop();

    useEffect(() => {
        const abortController = new AbortController();
        const {signal} = abortController;

        setLoading(true);
        axiosPrivate.delete(CHECKOUT_API_PATH + DELETE, {signal})
            .then(() => {
            })
            .finally(() => {
                setLoading(false);
            })

        return () => {
            abortController.abort();
        }
    }, []);


    return (
        <Container>
            <div className="flex flex-col gap-[24px] relative">
                <Header3>Your basket</Header3>
                <div className="flex gap-[42px]">
                    <div className="flex flex-col gap-[20px] w-full lg:w-2/3">
                        <BasketPositionsList/>
                    </div>
                    <div className="hidden lg:block lg:static lg:w-1/3">
                        <BasketTotal/>
                        <div className="mt-[17px]">
                            <BeginCheckout loadingParent={loading}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed left-0 bg-electron-primary-white bottom-0 w-full lg:hidden z-50">
                <BasketTotal/>
                <div className="mt-[17px]">
                        <BeginCheckout loadingParent={loading}/>
                </div>
            </div>
        </Container>
    )
}
