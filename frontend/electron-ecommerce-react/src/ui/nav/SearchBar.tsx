import {SearchSvg} from "../../assets/icons/SearchSvg.tsx";
import React, {useEffect, useRef, useState} from "react";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";
import {useFetchProductsByQuery} from "../../custom_hooks/useFetchProductsByQuery.ts";
import {useProductList} from "../../custom_hooks/useProductList.ts";

export const SearchBar = () => {

    const inputBigRef = useRef<HTMLInputElement | null>(null);
    const inputSmallRef = useRef<HTMLInputElement | null>(null);
    const width = useViewport();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const fetchByQuery = useFetchProductsByQuery();
    const productContext = useProductList();


    const handleFocus = () => {
        inputBigRef.current?.focus();
    }

    const expandSmallInput = () => {
        setIsExpanded(true);
        setTimeout(() => {
            inputSmallRef.current?.focus();
        }, 100)
    }

    const wrapSmallInput = () => {
        setIsExpanded(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        productContext?.setQuery(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        productContext?.setQuery(query);
        fetchByQuery(0);

    }

    useEffect(() => {
        productContext?.setQuery(query);
    }, [query]);


    return (
        <>
            {width >= Breakpoints.SMALL ?
                <div
                    onClick={handleFocus}
                    className={"focus-within:ring-1 cursor-text grow flex items-center gap-[6px] px-[14px] py-[10px] bg-electron-input-bg border border-electron-input-border rounded-xl"}>
                    <SmallSvgIcon>
                        <SearchSvg/>
                    </SmallSvgIcon>
                    <form
                        id="searchForm"
                        onSubmit={handleSubmit}>
                        <input name="abc" type="text" style={{display: 'none'}}/>
                        <input
                            ref={inputBigRef}
                            onChange={handleInputChange}
                            type="text"
                            name="search"
                            value={query} // Controlled component: value tied to state
                            placeholder="Search for products"
                            autoComplete="new-password"
                            className={`w-full bg-electron-input-bg placeholder:text-electron-primary-grey focus:outline-0`}
                            onFocus={(event) => event.target.setAttribute('autocomplete', 'off')}
                        />
                        <button form="searchForm" className="hidden" type="submit"/>
                    </form>
                </div>
                :

                <div
                    className={"grow flex flex-row-reverse"}>
                    <div onClick={expandSmallInput}>
                        <SmallSvgIcon>
                            <SearchSvg/>
                        </SmallSvgIcon>
                    </div>
                    <form
                        id="searchForm"
                        onSubmit={handleSubmit}>
                        <input name="abc" type="text" style={{display: 'none'}}/>
                        <input
                            ref={inputSmallRef}
                            value={query}
                            onBlur={wrapSmallInput}
                            onChange={handleInputChange}
                            type="text"
                            name="search"
                            placeholder="Search for products"
                            autoComplete="new-password"
                            className={`${isExpanded ? '' : 'hidden'} w-full bg-electron-input-bg placeholder:text-electron-primary-grey focus:outline- absolute top-1/2 left-0 -translate-y-1/2 rounded-xl py-1 px-3 focus:ring-1 border border-electron-input-border z-40`}/>
                        <button form="searchForm" className="hidden" type="submit"/>
                    </form>
                </div>

            }
        </>
    )

}