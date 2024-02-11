import {motion} from "framer-motion";

type ProductViewImageProps = {
    currentImage: string,
    productDescription: string,
}

export const ProductViewImage = ({currentImage, productDescription}: ProductViewImageProps) => {
    return (
        <div>
            <motion.img
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1
                }}
                src={currentImage} alt={productDescription}/>
        </div>
    )
}