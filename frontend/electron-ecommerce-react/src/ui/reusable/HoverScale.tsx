import {motion} from "framer-motion";

type HoverScaleProps = {
    children: React.ReactNode;
}

export const HoverScale = ({children}: HoverScaleProps) => {

    return (
        <motion.div
            whileHover={{scale: 1.05}}>
            {children}
        </motion.div>
    )
}