import {Bold} from "../reusable/Bold.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {OrderItemDto} from "../../api/dto/order/OrderItemDto.ts";

type OrderItemElProps = {
    items: OrderItemDto[]
}

export const OrderItemEl = ({items}: OrderItemElProps) => {

    return (

        <div className="overflow-y-auto h-[124px]">
            {items.map((value, index) => (
                <div key={index} className=" flex gap-[12px] items-center">
                    <div className="h-[62px] w-[62px] flex items-center justify-center">
                        <img className="overflow-hidden"
                             src={value.imgUrl}/>
                    </div>
                    <div>
                        x{value.quantity}
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col">
                            <p className={"font-[600] text-[10px] sm:text-[12px] md:text-[14px]"}>{value.name}</p>
                            <ParagraphSmall>{value.description}</ParagraphSmall>
                        </div>
                        <div className="flex items-center ml-auto pl-5">
                            <Bold weight={600} textSize={14}>${value.totalPrice}</Bold>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}