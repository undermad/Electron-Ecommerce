import {Navigation, Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Dispatch, SetStateAction} from "react";

type ReviewSliderProps = {
    reviews: string[],
    productDescription: string,
    callback: Dispatch<SetStateAction<number>>,
}


export const ReviewSlider = ({images, productDescription, callback}: ReviewSliderProps) => {

    return (
        <div className="w-full flex">
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                modules={[Navigation, Scrollbar]}
                navigation={{
                    prevEl: ".button-next-slide",
                    nextEl: ".button-prev-slide"
                }}
                scrollbar={{draggable: true}}
                className="px-10 relative"
            >
                <div className={"flex gap-[16px] mt-auto items-center"}>
                    {images.map((value, index) => (
                        <SwiperSlide>
                            <div className="py-3">
                                <div key={index}
                                     onClick={() => callback(index)}
                                     className={"cursor-pointer border border-electron-product-listing-bg rounded-md p-3"}>
                                    <img src={value} alt={productDescription}/>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
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


