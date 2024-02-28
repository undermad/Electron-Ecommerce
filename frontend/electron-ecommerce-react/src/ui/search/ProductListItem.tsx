import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {useNavigate} from "react-router-dom";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {AddToBasketButton} from "../reusable/AddToBasketButton.tsx";
import {RatingStars} from "../reusable/RatingStars.tsx";
import {useEffect, useState} from "react";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";

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

    return (
        <>
            {screenWidth >= Breakpoints.MEDIUM ?
                <div className="flex gap-[12px]">
                    <div className={"w-1/3 cursor-pointer"} onClick={() => handleProductClick(product.category)}>
                        <img src={product.imgUrl} alt={product.description}/>
                    </div>
                    <div onClick={() => handleClick(product.productId, product.category)}
                         className="w-full flex flex-col gap-[12px]">
                        <div className={"w-full flex flex-col justify-center cursor-pointer"}>
                            <p className={`text-electron-header-font text-[16px] font-[600] leading-7`}>
                                {product.name}
                            </p>
                            <ParagraphSmall>{product.description}</ParagraphSmall>
                            <RatingStars currentRate={product.currentRate}/>
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
                :
                <div
                    className={"flex justify-center w-full  mb-5 border border-electron-product-listing-bg rounded-3xl p-3"}>
                    <div className={"w-full flex flex-col j gap-1 items-center"}>
                        <div onClick={() => handleProductClick(product.category)} className="cursor-pointer flex flex-col w-full">
                            <div className={"w-full flex justify-center"}>
                                <img src={product.imgUrl} alt={product.description}/>
                            </div>
                            <div>
                                <p className={`text-electron-header-font text-[16px] font-[600] leading-7 mt-[12px] w-full`}>
                                    {product.name}
                                </p>
                                <ParagraphSmall>{product.description}</ParagraphSmall>
                                <h3 className={`text-electron-header-font text-[14px] font-[600] leading-7 w-full`}>
                                    £{product.price}
                                </h3>
                                <ParagraphSmall>Free delivery {date}</ParagraphSmall>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center mt-[12px]">
                            <AddToBasketButton product={product}/>
                        </div>

                    </div>

                </div>
            }
        </>
    )
}
