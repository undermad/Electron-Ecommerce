import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {Bold} from "../reusable/Bold.tsx";

type ProductListItemProps = {
    product: Product,
}


export const ProductListItem = ({product}: ProductListItemProps) => {


    return (
        <div className="flex gap-[12px]">
            <div className={"w-1/6"}>
                <img src={product.imgUrl} alt={product.description}/>
            </div>
            <div className={"w-2/6 flex flex-col justify-center"}>
                <Bold weight={600} textSize={16}>{product.name}</Bold>
                <ParagraphSmall>{product.description}</ParagraphSmall>
                <p>Rating</p>
            </div>
            <div className={"w-2/6 flex flex-col justify-center text-center"}>
                <Bold textSize={14} weight={600}>
                    £{product.price}
                </Bold>
            </div>
            <div className="w-1/6 flex flex-col justify-center">
                <ElectronButton textSize={12}>Add To Cart</ElectronButton>
            </div>
        </div>
    )
}