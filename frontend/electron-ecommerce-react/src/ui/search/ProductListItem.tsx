import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {useNavigate} from "react-router-dom";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {AddToBasketButton} from "../reusable/AddToBasketButton.tsx";
import {RatingStars} from "../reusable/RatingStars.tsx";
import {useEffect, useState} from "react";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";
import {MobileCard} from "./MobileCard.tsx";

type ProductListItemProps = {
    product: Product,
}


export const ProductListItem = ({product}: ProductListItemProps) => {

    const navigate = useNavigate();
    const screenWidth = useViewport();
    const [date, setDate] = useState<string>('');


    const handleProductClick = (category: string) => {
        navigate(`${SEARCH_ROUTE}/${category}/${product.productId}`)
    }

    const handleClick = (productId: number, category: string) => {
        navigate(`${SEARCH_ROUTE}/${category}/${productId}`);
    }

    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + 5);
        const deliveryDate = date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        setDate(deliveryDate)

    }, []);



    if (screenWidth <= Breakpoints.LARGE) return (
        <MobileCard product={product} date={date}/>
    )

    return (
        <div className="flex gap-[12px] items-center">
            <div className={"w-[300px]  cursor-pointer"}
                 onClick={() => handleProductClick(product.category)}>
                <img src={product.imgUrl} alt={product.description}/>
            </div>
            <div onClick={() => handleClick(product.productId, product.category)}
                 className="w-full flex flex-col gap-[12px]">
                <div className={"w-full flex flex-col justify-center cursor-pointer"}>
                    <p className={`text-electron-header-font text-[16px] font-[600] leading-7`}>
                        {product.name}
                    </p>
                    <ParagraphSmall>{product.description}</ParagraphSmall>
                    <div className="flex items-center">
                        <RatingStars currentRate={product.currentRate}/>
                        <ParagraphSmall>({product.totalReviews})</ParagraphSmall>
                    </div>
                    <h3 className={`text-electron-header-font text-[14px] font-[600] leading-7`}>
                        £{product.price}
                    </h3>
                    <ParagraphSmall>Free delivery {date}</ParagraphSmall>
                </div>
            </div>
            <div className="w-1/6">
                <AddToBasketButton product={product}/>
            </div>
        </div>
    )
}
