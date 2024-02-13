import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {useNavigate} from "react-router-dom";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {AddToBasketButton} from "../reusable/AddToBasketButton.tsx";
import {RatingStars} from "../reusable/RatingStars.tsx";

type ProductListItemProps = {
    product: Product,
}


export const ProductListItem = ({product}: ProductListItemProps) => {

    const navigate = useNavigate();
    const screenWidth = useViewport();

    const handleProductClick = () => {
        console.log(product.productId);
        navigate(location.pathname + '/' + product.productId)
    }


    return (
        <>
            {screenWidth >= Breakpoints.MEDIUM ?
                <div className="flex gap-[12px]">
                    <div className={"w-1/6 cursor-pointer"} onClick={handleProductClick}>
                        <img src={product.imgUrl} alt={product.description}/>
                    </div>
                    <div className={"w-2/6 flex flex-col justify-center cursor-pointer"} onClick={handleProductClick}>
                        <p className={`text-electron-header-font text-[16px] font-[600] leading-7`}>
                            {product.name}
                        </p>
                        <ParagraphSmall>{product.description}</ParagraphSmall>
                        <RatingStars currentRate={product.currentRate}/>
                    </div>


                    <div className={"w-2/6 flex flex-col justify-center text-center"}>
                        <h3 className={`text-electron-header-font text-[14px] font-[600] leading-7`}>
                            £{product.price}
                        </h3>
                    </div>


                    <div className="w-1/6 flex flex-col justify-center">
                        <AddToBasketButton product={product}/>
                    </div>
                </div>
                :
                <div className={"flex justify-center mb-5 border border-electron-product-listing-bg rounded-3xl p-3"}>
                    <div className={"w-full sm:w-1/2 flex flex-col gap-1 items-center"}>
                        <div onClick={handleProductClick} className="cursor-pointer flex flex-col items-center w-full">
                            <div className={"w-3/4"}>
                                <img src={product.imgUrl} alt={product.description}/>
                            </div>
                            <p className={`text-electron-header-font text-[16px] font-[600] leading-7 mt-[12px] w-full`}>
                                {product.name}
                            </p>
                            <ParagraphSmall>{product.description}</ParagraphSmall>
                            <h3 className={`text-electron-header-font text-[14px] font-[600] leading-7 w-full`}>
                                £{product.price}
                            </h3>
                        </div>
                        <div className="w-full flex flex-col justify-center mt-[12px]">
                            <ElectronButton textSize={12}>Add To Cart</ElectronButton>
                        </div>

                    </div>

                </div>
            }
        </>
    )
}
