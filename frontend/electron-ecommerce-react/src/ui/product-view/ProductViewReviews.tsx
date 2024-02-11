import {Bold} from "../reusable/Bold.tsx";
import {ReviewSlider} from "./ReviewSlider.tsx";
import {Review} from "../../api/dto/product/Review.ts";

type ProductViewReviewsProps = {
    reviews: Review[],
}

export const ProductViewReviews = ({reviews}: ProductViewReviewsProps) => {

    return (
        <div className="flex flex-col gap-[24px]">
            <div
                className={"text-[16px] text-electron-input-ash-blue pt-[40px] border-t border-electron-product-listing-bg flex flex-col gap-[24px]"}>
                <div className="rounded-md bg-electron-light-grey flex max-w-max px-[12px] py-[16px] ">
                    <Bold weight={600} textSize={20}>Reviews</Bold>
                </div>
            </div>

            <ReviewSlider reviews={reviews}/>
        </div>
    )
}