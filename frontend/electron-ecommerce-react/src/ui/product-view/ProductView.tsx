import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosBase, PRODUCT_API_PATH} from "../../api/axios.ts";
import {defaultProduct, Product} from "../../api/dto/product/Product.ts";
import {Container} from "../reusable/Container.tsx";
import {ProductViewImageCarousel} from "./ProductViewImageCarousel.tsx";
import {ProductDescription} from "./ProductDescription.tsx";
import {ProductViewPanel} from "./ProductViewPanel.tsx";
import {ProductViewReviews} from "./ProductViewReviews.tsx";
import {ProductViewTittle} from "./ProductViewTittle.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {useScrollToTop} from "../../custom_hooks/useScrollToTop.ts";

export const ProductView = () => {

    const param = useParams();
    const productId = param.productId;
    const [product, setProduct] = useState<Product>(defaultProduct);
    const [loading, setLoading] = useState<boolean>(false);
    const viewport = useViewport();

    useScrollToTop();


    useEffect(() => {
        setLoading(true);
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

    return (

        <Container>
            {viewport >= Breakpoints.LARGE ?
                <div>
                    {!loading &&
                        <main className={"flex flex-col gap-[42px]"}>
                            <div className="flex gap-[65px]">
                                <ProductViewImageCarousel images={product.images}
                                                          productDescription={product.description}/>
                                <div>
                                    <ProductViewTittle name={product.name} description={product.description}/>
                                    <ProductViewPanel product={product}/>
                                </div>
                            </div>

                            <ProductDescription description={product.productInformation}/>
                            <ProductViewReviews reviews={product.reviews}/>

                        </main>
                    }
                </div>
                :
                <div>
                    <main className={"flex flex-col gap-[42px]"}>
                        <ProductViewTittle name={product.name} description={product.description}/>
                        <ProductViewImageCarousel images={product.images} productDescription={product.description}/>
                        <ProductViewPanel product={product}/>
                        <ProductDescription description={product.productInformation}/>
                        <ProductViewReviews reviews={product.reviews}/>
                    </main>
                </div>
            }
        </Container>
    )
}
