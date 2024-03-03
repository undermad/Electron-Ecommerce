import {HoverScale} from "../reusable/HoverScale.tsx";
import {Bold} from "../reusable/Bold.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RatingStars} from "../reusable/RatingStars.tsx";
import {AddToBasketButton} from "../reusable/AddToBasketButton.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";
import {useNavigate} from "react-router-dom";

type ProductListItemProps = {
    product: Product,
    date?: string,
}

export const MobileCard = ({product, date}: ProductListItemProps) => {

    const navigate = useNavigate();

    const handleProductClick = (category: string) => {
        navigate(`${SEARCH_ROUTE}/${category}/${product.productId}`)
    }

    return (
        <figure
            className="flex flex-col gap-[12px] h-full">
            <div onClick={() => handleProductClick(product.category)}
                 className="border border-electron-grey rounded-lg flex justify-center items-center cursor-pointer">
                <HoverScale>
                    <img className="p-2 w-[240px] h-[213px]"
                         src={product.imgUrl} alt={product.description}/>
                </HoverScale>
            </div>

            <div className="cursor-pointer h-full"
                 onClick={() => handleProductClick(product.category)}>
                <div className="flex flex-col items-start w-full">
                    <Bold weight={600} textSize={16}>{product.name}</Bold>
                    <ParagraphSmall>{product.description}</ParagraphSmall>
                    <div className="flex items-center">
                        <RatingStars currentRate={product.currentRate}/>
                        <ParagraphSmall>({product.totalReviews})</ParagraphSmall>
                    </div>
                </div>
                <h3 className={`text-electron-header-font text-[14px] font-[600] leading-7 w-full`}>
                    £{product.price}
                </h3>
                <ParagraphSmall>Free delivery {date}</ParagraphSmall>
            </div>
            <div className="flex items-start w-full">
                <div className="w-full">
                    <AddToBasketButton product={product}/>
                </div>
            </div>
        </figure>
    )
}
