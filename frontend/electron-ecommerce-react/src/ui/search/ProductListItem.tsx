import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Product} from "../../api/dto/product/Product.ts";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {Bold} from "../reusable/Bold.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";

type ProductListItemProps = {
    product: Product,
}


export const ProductListItem = ({product}: ProductListItemProps) => {

    const navigate = useNavigate();

    const handleProductClick = () => {
        console.log(product.productId);
        navigate(location.pathname + '/' + product.productId)
    }


    return (
        <div className="flex gap-[12px]">
            <div className={"w-1/6 cursor-pointer"} onClick={handleProductClick}>
                <img src={product.imgUrl} alt={product.description}/>
            </div>
            <div className={"w-2/6 flex flex-col justify-center cursor-pointer"} onClick={handleProductClick}>
                <p className={`text-electron-header-font text-[16px] font-[600] leading-7`}>
                    {product.name}
                </p>
                <ParagraphSmall>{product.description}</ParagraphSmall>
                <p>Rating</p>
            </div>


            <div className={"w-2/6 flex flex-col justify-center text-center"}>
                <h3 className={`text-electron-header-font text-[14px] font-[600] leading-7`}>
                    £{product.price}
                </h3>
            </div>
            {/*<ul>*/}
            {/*    {product.features.map(value => (*/}
            {/*      <li>{value}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}

            <div className="w-1/6 flex flex-col justify-center">
                <ElectronButton textSize={12}>Add To Cart</ElectronButton>
            </div>
        </div>
    )
}