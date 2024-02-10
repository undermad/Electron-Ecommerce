import {useEffect, useState} from "react";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";
import {ActiveSlider} from "./ActiveSlider.tsx";

type ImageProductViewProps = {
    images: string[],
    productDescription: string,
}

export const ImageProductView = ({images, productDescription}: ImageProductViewProps) => {

    const [currentImage, setCurrentImage] = useState<string>('')
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleNextImage = () => {
        if (currentIndex === images.length - 1) return;
        setCurrentIndex(currentIndex + 1);
    }

    const handlePreviousImage = () => {
        if (currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    }

    useEffect(() => {
        setCurrentImage(images[0]);
    }, [images]);

    useEffect(() => {
        setCurrentImage(images[currentIndex]);
    }, [currentIndex]);

    return (
        <main className={"flex flex-col gap-[16px] items-center w-[500px] select-none"}>
            <div className={"relative group"}>
                {currentIndex !== 0 ?
                    <div
                        className={"absolute opacity-0 group-hover:opacity-100 left-0 top-1/2 -translate-x-1/2 cursor-pointer"}
                        onClick={handlePreviousImage}>
                        <IoIosArrowBack size={28}/>
                    </div> : ''
                }
                <img src={currentImage} alt={productDescription}
                     className={""}/>
                {currentIndex !== images.length - 1 ?
                    <div
                        className={"absolute opacity-0 group-hover:opacity-100 right-0 top-1/2 translate-x-1/2 cursor-pointer"}
                        onClick={handleNextImage}>
                        <IoIosArrowForward size={28}/>
                    </div> : ''
                }
            </div>
            {images.length > 1 ?
                <ActiveSlider callback={setCurrentIndex} images={images} productDescription={productDescription}/>
                : ''
            }
        </main>
    )
}