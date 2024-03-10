import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {useEffect, useRef, useState} from "react";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {useNavigate} from "react-router-dom";
import {SEARCH_ROUTE} from "../../constants/Routes.ts";

type HeroSlide = {
    image: string,
    header: string,
    description: string,
    buttonText: string,
    clickEvent: () => void,
}

export const Hero = () => {

    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);

    const slides: HeroSlide[] = [
        {
            image: 'https://electron-img-01.s3.eu-west-2.amazonaws.com/extpc2.jpg',
            header: 'Build your dream pc',
            description: 'Discover top-quality parts tailored for performance and reliability, and bring your ultimate PC to life effortlessly.',
            buttonText: 'Explore',
            clickEvent: () => {
                if (ref.current) {
                    const divBottomPosition = ref.current.offsetTop + ref.current.offsetHeight;
                    window.scrollBy({
                        top: divBottomPosition,
                        behavior: 'smooth'
                    })
                }
            }
        },
        {
            image: 'https://electron-img-01.s3.eu-west-2.amazonaws.com/graphic_card_gpt_extended.jpg',
            header: 'Elevate Your Visuals',
            description: 'Explore top-tier graphic cards for stunning visuals and peak performance.',
            buttonText: 'Discover',
            clickEvent: () => {
                navigate(`${SEARCH_ROUTE}/graphic card`)
            }
        },
        {
            image: 'https://electron-img-01.s3.eu-west-2.amazonaws.com/extkeyboard.jpg',
            header: 'Enhance you writing',
            description: 'Explore our collection of sleek and efficient keyboards, designed to elevate your typing experience with unparalleled comfort and responsiveness.',
            buttonText: 'Tap',
            clickEvent: () => {
                navigate(`${SEARCH_ROUTE}/keyboard`)
            }
        },
    ];

    const mobileSlides: HeroSlide[] = [
        {
            image: 'https://electron-img-01.s3.eu-west-2.amazonaws.com/keyboardMob.webp',
            header: 'Build your dream pc',
            description: 'Discover top-quality parts tailored for performance and reliability, and bring your ultimate PC to life effortlessly.',
            buttonText: 'Explore',
            clickEvent: () => {
                if (ref.current) {
                    const divBottomPosition = ref.current.offsetTop + ref.current.offsetHeight;
                    window.scrollBy({
                        top: divBottomPosition,
                        behavior: 'smooth'
                    })
                }
            }
        },
        {
            image: 'https://electron-img-01.s3.eu-west-2.amazonaws.com/memorymobile.webp',
            header: 'Speed Up with Fast Memory',
            description: 'Maximize your system\'s potential with our high-performance memory, designed for seamless multitasking and lightning-fast data processing.',
            buttonText: 'Discover',
            clickEvent: () => {
                navigate(`${SEARCH_ROUTE}/memory`)
            }
        },
        {
            image: 'https://electron-img-01.s3.eu-west-2.amazonaws.com/keymobile.webp',
            header: 'Enhance you writing',
            description: 'Explore our collection of sleek and efficient keyboards, designed to elevate your typing experience with unparalleled comfort and responsiveness.',
            buttonText: 'Tap',
            clickEvent: () => {
                navigate(`${SEARCH_ROUTE}/keyboard`)
            }
        },
    ];

    const images = ['https://electron-img-01.s3.eu-west-2.amazonaws.com/extpc2.jpg',
        'https://electron-img-01.s3.eu-west-2.amazonaws.com/extpc1.jpg',
        'https://electron-img-01.s3.eu-west-2.amazonaws.com/extkeyboard.jpg']

    const mobileImages = ['https://electron-img-01.s3.eu-west-2.amazonaws.com/keyboardMob.webp',
        'https://electron-img-01.s3.eu-west-2.amazonaws.com/memorymobile.webp',
        'https://electron-img-01.s3.eu-west-2.amazonaws.com/keymobile.webp']

    const [img, setImg] = useState<HeroSlide[]>([]);

    const viewport = useViewport();

    useEffect(() => {
        if (viewport >= Breakpoints.SMALL) {
            setImg(slides);
        } else {
            setImg(mobileSlides);
        }
    }, [viewport]);


    return (
        <div
            ref={ref}
            className="w-full ">
            <Swiper className="mySwiper"
                    pagination={{clickable: true}}
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: true
                    }}
            >

                {img.map((item, key) => (
                    <SwiperSlide key={key}>
                        <div className="relative flex justify-center">
                            <img
                                className="w-full sm:object-cover h-screen mt-[-55px] sm:mt-0 sm:h-auto sm:max-h-[1200px]"
                                alt="computer component generated by ai" src={item.image}/>
                            <div
                                className="absolute w-full sm:w-[300px] md:w-[400px] 2xl:w-[600px] flex flex-col gap-5 text-electron-dirty-white items-center sm:items-start top-[5%] sm:top-[10%] sm:left-[5%] lg:top-[25%] lg:left-[10%]">
                                <p className="font-[600] text-center sm:text-xl md:text-2xl 2xl:text-4xl tracking-wider">{item.header}</p>
                                <p className="hidden sm:flex font-[300]  text-sm  md:text-md font-serif leading-5 md:leading-7 text-electron-primary-white">
                                    {item.description}</p>
                                <button
                                    onClick={item.clickEvent}
                                    className="hidden sm:block text-electron-dirty-white border border-electron-dirty-white hover:bg-electron-primary-white hover:text-electron-primary-dark-blue rounded-md px-10 py-2 transition-colors duration-100 ease-in">
                                    {item.buttonText}
                                </button>


                            </div>
                            <button
                                onClick={item.clickEvent}
                                className="absolute top-[80%] sm:hidden text-electron-dirty-white border border-electron-dirty-white hover:bg-electron-primary-white hover:text-electron-primary-dark-blue rounded-md px-10 py-2 transition-colors duration-100 ease-in">
                                {item.buttonText}
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-pagination-bullet-active"></div>


            </Swiper>

        </div>
    )
}