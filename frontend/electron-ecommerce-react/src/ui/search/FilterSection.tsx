import {Filter} from "./Filter.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../../context/ThemeContext.tsx";
import {ElectronButton} from "../reusable/ElectronButton.tsx";

export const FilterSection = () => {

    const viewport = useViewport();
    const filterRef = useRef<HTMLDivElement | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const themeContext = useContext(ThemeContext);

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

    return (
        <main className="w-full">
            {isExpanded ?
                <div className={"fixed flex flex-col left-0 top-0 z-40 w-full sm:w-[350px]  h-screen bg-electron-primary-white"}>
                    <div className={"h-full flex overflow-y-auto"}
                         ref={filterRef}>
                        <Filter/>
                        <div onClick={expandFilters}>x</div>
                    </div>
                    <div>
                        <ElectronButton onClick={handleShowResult}>Show result</ElectronButton>
                    </div>
                </div>
                :
                <div className={"border rounded cursor-pointer"} onClick={expandFilters}>
                    Filters
                </div>}
        </main>
    )
}