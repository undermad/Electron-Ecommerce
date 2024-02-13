import {Filter} from "./Filter.tsx";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../../context/ThemeContext.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";
import {useProductList} from "../../custom_hooks/useProductList.ts";

export const FilterSection = () => {
    const filterRef = useRef<HTMLDivElement | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const themeContext = useContext(ThemeContext);
    const fetchProducts = useFetchProducts();
    const productContext = useProductList();

    const expandFilters = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        toggleFilter();
    }

    const handleShowResult = () => {
        toggleFilter();
    }

    const toggleFilter = () => {
        setIsExpanded(!isExpanded);
        themeContext?.setFadeAwayBackground(!isExpanded);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current?.contains(event.target as Node)) {
            toggleFilter();
        }
    }

    useEffect(() => {
        if (isExpanded) window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [isExpanded]);

    useEffect(() => {
        return () => {
            themeContext?.setFadeAwayBackground(false)
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [productContext?.categoryResponse.name]);

    return (
        <main className="w-full">
            {isExpanded ?
                <article
                    className={"fixed flex flex-col left-0 top-0 z-40 w-full sm:w-[350px] h-screen bg-electron-primary-white sm:rounded-r-md"}>
                    <div className={"h-full flex flex-col overflow-y-auto"}
                         ref={filterRef}>
                        <div className={"flex justify-between mb-1 border-b border-electron-product-listing-bg"}>
                            <div className={"w-5/6 px-4 py-2"}>
                                <Header3>Filters</Header3>
                                <ParagraphSmall tailwind="text-[14px]">Apply filters to table data</ParagraphSmall>
                            </div>
                            <div className={"w-1/6 flex items-center justify-center text-center cursor-pointer"}
                                 onClick={expandFilters}>x
                            </div>
                        </div>
                        <Filter/>
                    </div>
                    <div className={"w-full border-t border-electron-product-listing-bg"}>
                        <div className={"ml-auto w-1/2 mt-1 mb-1 mr-1"}>
                            <ElectronButton rounded={"xl"} onClick={handleShowResult}>Show result</ElectronButton>
                        </div>
                    </div>
                </article>
                :
                <div className={"border rounded cursor-pointer"} onClick={expandFilters}>
                    Filters
                </div>}
        </main>
    )
}