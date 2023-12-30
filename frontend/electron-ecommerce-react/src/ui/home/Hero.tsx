import headphones from "../../assets/images/headphones_white.png";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

export const Hero = () => {


    return (
        <div
            className={"mt-[16px] sm:h-[350px] rounded-3xl bg-electron-primary-dark-blue overflow-hidden relative"}>
            <div
                className={"absolute w-[210px] h-[165px] lg:w-[210px] lg:h-[145px] blur-[100px] -rotate-[135deg] bg-gradient-to-t from-electron-gradient-light-blue to-electron-gradient-eye-blue"}/>
            <div
                className={"absolute -right-0 w-[210px] h-[165px] lg:w-[445px] lg:h-[308px] blur-[100px] -rotate-[135deg] bg-gradient-to-t from-electron-gradient-light-blue to-electron-gradient-eye-blue"}/>
            <motion.img
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                initial={{
                    x: 100,
                    opacity: 0,
                }}
                className={"absolute w-[552px] sm:scale-[0.6] md:scale-75 lg:scale-100  sm:-top-[110px] sm:-right-[110px]  lg:-top-[80px] lg:right-[-29px] "}
                 src={headphones}
                 alt={"transparent headphones image"}/>

            <motion.div
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                initial={{
                    x: -100,
                    opacity: 0,
                }}
                className={"absolute top-[79px] md:top-[59px] left-[60px] md:left-[93px]  text-[28px] text-electron-primary-white flex flex-col gap-7"}>
                <p className={"flex flex-col"}>
                    <span className={"text-[20px] md:text-[24px] lg:text[60px]"}>Journey Into Sound</span>
                    <span className={"text-[45px] md:text-[50px] lg:text-[62px]"}>Airpods Max</span>
                </p>
                <Link to={'/'}>
                            <span
                                className={"text-[20px] bg-electron-button-bg-blue py-4 px-8 rounded-[24px]"}>25% OFF</span>
                </Link>
            </motion.div>
        </div>
    )
}