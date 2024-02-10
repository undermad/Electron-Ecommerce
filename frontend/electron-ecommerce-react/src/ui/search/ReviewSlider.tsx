import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

type ReviewSliderProps = {
    reviews: Review[],

}


export const ReviewSlider = ({reviews}: ReviewSliderProps) => {

    return (
        <div className="w-full flex">
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
                <div className={"flex gap-[16px] mt-auto items-center"}>
                        {reviews.map((value, index) => (
                                <SwiperSlide key={index}>
                                    <div className="py-3">
                                        <div key={index}
                                             className={"cursor-pointer border border-electron-product-listing-bg rounded-md p-3"}>
                                            <p>{value.fullName}</p>
                                            <p>{value.review}</p>
                                            <p>{value.rate}</p>
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
        </div>
    );
};


