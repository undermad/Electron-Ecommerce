import arrowDownSVG from "../../assets/icons/arrow-down.svg";
import listSVG from '../../assets/icons/list.svg';
import xSVG from '../../assets/icons/x.svg';
import {useViewport} from "../custom_hooks/CustomHooks.ts";
import {Breakpoints} from "../custom_hooks/Breakpoints.ts";
import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {CategoryLink} from "./CategoryLink.tsx";

export const CategoriesList = () => {

    const width = useViewport();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
    const categoriesList: string[] = ['GPU', 'CPU', 'Monitors', 'Headphones', 'Accessories'];


    const expand = () => {
        setIsExpanded(!isExpanded)
    }

    useEffect(() => {
        const handleClose = (e: { target: Node | null; }) => {
            if (!dropdownMenuRef.current?.contains(e.target)) {
                setIsExpanded(false);
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener('click', handleClose);

    }, []);


    return (
        <div
            ref={dropdownMenuRef}
            onClick={expand}
            onBlur={expand}
            className={"flex gap-[24px] items-center"}
        >
            {width >= Breakpoints.LARGE &&
                <div className={'flex gap-[6px] items-center relative'}>
                    <span className={"h-10px hover:scale-105 cursor-pointer"}>Categories</span>

                    <motion.img
                        animate={{
                            rotate: isExpanded ? 180 : 0,
                        }}
                        src={arrowDownSVG} className={"w-[20px] h-[20px] cursor-pointer"} alt={'arrow down'}/>

                    <motion.div
                        animate={{
                            y: isExpanded ? 0 : -100,
                            opacity: isExpanded ? 1 : 0,
                        }}
                        className={`${isExpanded ? '' : 'hidden'} absolute top-[50px] w-full bg-electron-primary-dark-blue p-5 `}>

                        <ul>
                            {categoriesList.map((category) => (
                                <CategoryLink>{category}</CategoryLink>
                            ))}
                        </ul>

                    </motion.div>

                </div>
            }

            {width < Breakpoints.LARGE &&
                <div className={""}>
                    {!isExpanded ? <img src={listSVG} alt={'categories list svg'} className={"w-[20px] h-[20px] cursor-pointer"}/>
                        : <img src={xSVG} alt={'categories list svg'} className={"w-[20px] h-[20px] cursor-pointer"}/>}


                    <motion.div
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : -100,
                        }}
                        className={`${isExpanded ? '' : 'hidden'} absolute left-0 top-full w-full bg-electron-primary-dark-blue`}>

                        <ul className={"flex flex-col items-center"}>
                            {categoriesList.map((category) => (
                                <CategoryLink>{category}</CategoryLink>
                            ))}
                        </ul>
                    </motion.div>


                </div>
            }

        </div>

    )
}