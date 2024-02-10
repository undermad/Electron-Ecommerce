import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosBase, PRODUCT_API_PATH} from "../../api/axios.ts";
import {defaultProduct, Product} from "../../api/dto/product/Product.ts";
import {Container} from "../reusable/Container.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {CiDeliveryTruck} from "react-icons/ci";
import {MdStoreMallDirectory} from "react-icons/md";
import {Bold} from "../reusable/Bold.tsx";
import {ImageProductView} from "./ImageProductView.tsx";
import {ProductDescription} from "./ProductDescription.tsx";
import {ReviewSlider} from "./ReviewSlider.tsx";

export const ProductView = () => {

    const param = useParams();
    const productId = param.productId;
    const [product, setProduct] = useState<Product>(defaultProduct);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        setLoading(false);
        axiosBase.get(PRODUCT_API_PATH + `/${productId}`)
            .then(response => {
                setProduct(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setLoading(false))

    }, []);

    useEffect(() => {
        console.log(product)
    }, [product]);


    return (
        <Container>
            {!loading &&
                <main className={"flex flex-col gap-[42px]"}>

                    <div className="flex gap-[65px]">
                        <ImageProductView images={product.images} productDescription={product.description}/>


                        <article className={"flex flex-col gap-[24px]"}>
                            <div className={"flex flex-col gap-[23px]"}>
                                <div className="flex flex-col gap-[8px]">
                                    <Bold leading={8} textSize={28} weight={600}>{product.name}</Bold>
                                    <ParagraphSmall tailwind="text-[16px]">{product.description}</ParagraphSmall>
                                </div>
                                <p>{product.currentRate}</p>
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
                                <div className="flex gap-5">
                                    <div className="w-[150px]">
                                        <ElectronButton>Add</ElectronButton>
                                    </div>
                                    <div className="w-[150px]">
                                        <ElectronButton>Buy Now</ElectronButton>
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
                    </div>


                    <ProductDescription description={product.productInformation}/>

                    <div
                        className={"text-[16px] text-electron-input-ash-blue pt-[40px] border-t border-electron-product-listing-bg flex flex-col gap-[24px]"}>
                        <div className="rounded-md bg-electron-light-grey flex max-w-max px-[12px] py-[16px] ">
                            <Bold weight={600} textSize={20}>Reviews</Bold>
                        </div>
                    </div>

                    <ReviewSlider reviews={product.reviews}/>


                </main>
            }
        </Container>

    )
}
