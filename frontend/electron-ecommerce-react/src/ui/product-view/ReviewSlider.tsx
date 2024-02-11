import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Review} from "../../api/dto/product/Review.ts";
import {ProductReview} from "./ProductReview.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";

type ReviewSliderProps = {
    reviews: Review[],
}


export const ReviewSlider = ({reviews}: ReviewSliderProps) => {


    return (
        <div className="w-full flex">
            {reviews ?
                <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".button-next-slide",
                        nextEl: ".button-prev-slide"
                    }}
                    className="px-10 relative"
                >
                    <div className={"flex gap-[16px] items-center"}>
                        {reviews.map((value, index) => (
                            <SwiperSlide key={index}>
                                <div className="py-3 h-full">
                                    <div key={index}
                                         className={"border border-electron-product-listing-bg rounded-md p-3 h-full"}>
                                        <ProductReview review={value}/>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                        }
                    </div>


                    <div
                        className="cursor-pointer button-next-slide absolute z-50 left-0  top-1/2 -translate-y-1/2 w-[40px] h-[40px] grid place-items-center">
                        <IoIosArrowBack size={28}/>
                    </div>
                    <div
                        className="cursor-pointer button-prev-slide absolute z-10 right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] grid place-items-center">
                        <IoIosArrowForward size={28}/>
                    </div>


                </Swiper>
                :
                <ParagraphSmall>There is no reviews yet</ParagraphSmall>
            }

        </div>
    );
};


