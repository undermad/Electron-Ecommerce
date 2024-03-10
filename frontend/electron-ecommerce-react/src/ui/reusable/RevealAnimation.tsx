import React, {useEffect, useRef} from "react";
import {useAnimation, useInView, motion} from "framer-motion";

type RevealAnimationProps = {
    children: React.ReactNode;
}

export const RevealAnimation = ({children}: RevealAnimationProps) => {


    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, {once: false})

    const mainControls = useAnimation();

    useEffect(() => {
        console.log(isInView)
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    return (
        <motion.div
            variants={{
                hidden: {opacity: 0, y: 25},
                visible: {opacity: 1, y: 0},
            }}
            initial="hidden"
            transition={{duration: 0.3, delay: 0.25}}
            animate={mainControls}
            ref={ref}>

            {children}
        </motion.div>
    )

}