import {BasketPositionsList} from "./BasketPositionsList.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {Container} from "../reusable/Container.tsx";
import {BasketTotal} from "./BasketTotal.tsx";
import {ContinueToCheckoutButton} from "./ContinueToCheckoutButton.tsx";

export const Basket = () => {


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
                            <ContinueToCheckoutButton/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed left-0 bg-electron-primary-white bottom-0 w-full lg:hidden">
                <BasketTotal/>
                <div className="mt-[17px]">
                    <ContinueToCheckoutButton/>
                </div>
            </div>
        </Container>
    )
}
