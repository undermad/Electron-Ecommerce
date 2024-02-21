import {Span} from "../reusable/Span.tsx";

type TotalSummaryProps = {
    totalItems: number,
    totalPrice: number,
}

export const TotalSummary = ({totalItems, totalPrice}: TotalSummaryProps) => {

    return (
        <>
            <div
                className={"flex flex-col gap-[17px] mt-[17px] border-b border-electron-product-listing-bg"}>
                <div className="flex justify-between">
                    <Span>Total items</Span>
                    <Span>{totalItems}</Span>
                </div>
                <div className="flex justify-between">
                    <Span>Delivery cost</Span>
                    <Span>Free delivery</Span>
                </div>
                <div className="flex justify-between pb-[17px]">
                    <Span>Discount</Span>
                    <Span>£0</Span>
                </div>
            </div>
            <div className="flex justify-between mt-[17px]">
                <Span>Total</Span>
                <Span>£{totalPrice}</Span>
            </div>
        </>
    )
}