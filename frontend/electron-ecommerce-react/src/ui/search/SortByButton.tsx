import {useEffect, useRef, useState} from "react";
import {SortByButtonChild} from "./SortByButtonChild.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";
import {ArrowDown} from "../../assets/icons/ArrowDown.tsx";
import {motion} from "framer-motion";
import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {ASC_DIRECTION, DESC_DIRECTION} from "../../constants/Query.ts";

export const SortByButton = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const [sortBy, setSortBy] = useState<string>("Relevance");
    const fetchProducts = useFetchProducts();
    const productContext = useProductList();

    const toggleDropdown = () => setIsExpanded(!isExpanded);

    const handleClickOutside = (event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current?.contains(event.target as Node)) {
            setIsExpanded(false);
        }
    }

    const callback = (name: string, direction: string, displayText: string) => {
        productContext?.setSortBy(name);
        productContext?.setSortDirection(direction);
        setSortBy(displayText);
    }

    useEffect(() => {
        fetchProducts();
    }, [sortBy]);

    useEffect(() => {
        if (isExpanded) window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [isExpanded]);

    return (
        <div className="relative flex">
            <div
                ref={buttonRef}
                onClick={toggleDropdown}
                className="px-4 py-3 w-full sm:w-[280px] text-white flex justify-between cursor-pointer border border-electron-input-grey rounded-lg hover:bg-electron-very-light-blue">
                <div>
                    Sort By: {sortBy}
                </div>
                <div className="flex justify-center items-center">
                    <motion.div
                        animate={{
                            rotate: isExpanded ? 180 : 0,
                        }}>
                        <SmallSvgIcon>
                            <ArrowDown color="black"/>
                        </SmallSvgIcon>
                    </motion.div>
                </div>
            </div>
            {isExpanded && (
                <motion.div
                    animate={{
                        opacity: isExpanded ? 1 : 0,
                    }}
                    className={`absolute ${isExpanded ? '' : 'hidden '}  p-1 left-0 flex flex-col gap-1 bottom-0 translate-y-[100%] w-full sm:w-[280px] shadow-lg border border-electron-input-grey rounded-lg bg-electron-primary-white z-50 `}>
                    <SortByButtonChild queryParam="relevance" direction={ASC_DIRECTION} callback={callback} name={"Relevance"}/>
                    <SortByButtonChild queryParam="price" direction={ASC_DIRECTION} callback={callback} name={"Price - low to high"}/>
                    <SortByButtonChild queryParam="price" direction={DESC_DIRECTION} callback={callback} name={"Price - high to low"}/>
                    <SortByButtonChild queryParam="name" direction={ASC_DIRECTION} callback={callback} name={"Name - asc"}/>
                    <SortByButtonChild queryParam="name" direction={DESC_DIRECTION} callback={callback} name={"Name - desc"}/>
                </motion.div>
            )}
        </div>
    )
}