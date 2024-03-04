import {Bold} from "../reusable/Bold.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {CiDeliveryTruck} from "react-icons/ci";
import {MdStoreMallDirectory} from "react-icons/md";
import {Product} from "../../api/dto/product/Product.ts";
import {AddToBasketButton} from "../reusable/AddToBasketButton.tsx";
import {RatingStars} from "../reusable/RatingStars.tsx";

type ProductViewPanelProps = {
    product: Product
}

export const ProductViewPanel = ({product}: ProductViewPanelProps) => {

    return (
        <article className={"flex flex-col gap-[24px]"}>
            <div className={"flex flex-col gap-[23px]"}>

                <div className={"flex items-center gap-1"}>
                    <RatingStars currentRate={product.currentRate}/>
                    {product.totalReviews &&
                        <ParagraphSmall>({product.totalReviews})</ParagraphSmall>}
                </div>
            </div>

            <span className="border-b border-electron-product-listing-bg pb-[24px]">
                <Bold weight={600} textSize={28}>£{product.price}</Bold>
            </span>

            <figure>
                <div className="flex flex-col gap-[16px]">
                    <ParagraphSmall>Features</ParagraphSmall>
                    <div className={"flex gap-1"}>

                        {product.features.map((feature, index) => (
                            <p key={index}
                               className="cursor-default h-[50px] text-sm flex justify-center items-center px-2 mb-2 border border-electron-product-listing-bg rounded-md">
                                {feature.value}
                            </p>
                        ))}
                    </div>
                </div>
            </figure>

            <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-5 w-full">
                    <div className="">
                        <AddToBasketButton product={product}/>
                    </div>

                </div>
                <ParagraphSmall>{product.stockQuantity} Products left</ParagraphSmall>
            </div>
            <div
                className="flex flex-col p-[10px]  rounded-lg border border-electron-product-listing-bg">
                <div className="border-b border-electron-product-listing-bg">
                    <div className="flex gap-[22px] mb-2">
                        <p className="w-[96px] h-[73px] bg-electron-light-grey flex justify-center items-center rounded-md">
                            <CiDeliveryTruck size={28}/>
                        </p>
                        <div className="flex flex-col gap-[6px] justify-center">
                            <Bold textSize={20} weight={600}>Free Delivery</Bold>
                            <ParagraphSmall>Process to checkout to see available
                                options</ParagraphSmall>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[22px] mt-2">
                    <p className="w-[96px] h-[73px] bg-electron-light-grey flex justify-center items-center rounded-md">
                        <MdStoreMallDirectory size={28}/>
                    </p>
                    <div className="flex flex-col gap-[6px] justify-center">
                        <Bold textSize={20} weight={600}>Free Delivery</Bold>
                        <ParagraphSmall>Process to checkout to see available
                            options</ParagraphSmall>
                    </div>
                </div>
            </div>
        </article>
    )
}
