import {BasketPositionsList} from "./BasketPositionsList.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {Container} from "../reusable/Container.tsx";
import {BasketTotal} from "./BasketTotal.tsx";
import {ContinueToCheckoutButton} from "./ContinueToCheckoutButton.tsx";

export const Basket = () => {




    return (
        <Container>

            <div className="flex gap-[42px]">
                <div className="flex flex-col gap-[20px] w-2/3">
                    <Header3>Your basket</Header3>
                    <BasketPositionsList/>
                </div>
                <div className="w-1/3">
                    <BasketTotal/>
                    <div className="mt-[17px]">
                        <ContinueToCheckoutButton/>
                    </div>
                </div>
            </div>
        </Container>
    )
}
