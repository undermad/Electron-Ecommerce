import {Bold} from "../reusable/Bold.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RatingStars} from "../reusable/RatingStars.tsx";
import {Review} from "../../api/dto/product/Review.ts";
import {CiUser} from "react-icons/ci";

type ProductReviewProps = {
    review: Review,
}

export const ProductReview = ({review}: ProductReviewProps) => {

    return (
        <>
            <div className="flex gap-[16px]">

                <div className={"w-[64px] h-[64px] flex justify-center items-center rounded-full"}>
                    <CiUser color="#2f2f2f" size={50}/>
                </div>
                <div className="flex flex-col justify-center">
                    <Bold textSize={18} weight={600}>{review.fullName}</Bold>
                    <ParagraphSmall>{review.createdOn}</ParagraphSmall>
                </div>
            </div>
            <RatingStars currentRate={review.rate}/>
            <p className={"text-electron-header-font"}>{review.review}</p>
        </>
    )
}