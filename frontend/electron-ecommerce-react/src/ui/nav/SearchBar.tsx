import {SearchSvg} from "../../assets/icons/SearchSvg.tsx";
import {useRef, useState} from "react";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";

export const SearchBar = () => {

    const inputBigRef = useRef<HTMLInputElement | null>(null);
    const inputSmallRef = useRef<HTMLInputElement | null>(null);
    const width = useViewport();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

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


    return (

        <>
            {width >= Breakpoints.SMALL ?
                <div
                    onClick={handleFocus}
                    className={"focus-within:ring-1 cursor-text grow flex items-center gap-[6px] px-[14px] py-[10px] bg-electron-input-bg border border-electron-input-border rounded-xl"}>
                    <SmallSvgIcon>
                        <SearchSvg/>
                    </SmallSvgIcon>
                    <input
                        ref={inputBigRef}
                        type={'text'}
                        name={'search'}
                        placeholder={'Search for products'}
                        autoComplete={'off'}
                        className={`w-full bg-electron-input-bg placeholder:text-electron-primary-grey focus:outline-0`}/>
                </div>
                :

                <div
                    className={"grow flex flex-row-reverse"}>
                    <div onClick={expandSmallInput}>
                        <SmallSvgIcon>
                            <SearchSvg/>
                        </SmallSvgIcon>
                    </div>
                    <input
                        ref={inputSmallRef}
                        onBlur={wrapSmallInput}
                        type={'text'}
                        name={'search'}
                        placeholder={'Search for products'}
                        autoComplete={'off'}
                        className={`${isExpanded ? '' : 'hidden'} w-full bg-electron-input-bg placeholder:text-electron-primary-grey focus:outline- absolute top-1/2 left-0 -translate-y-1/2 rounded-xl py-1 px-3 focus:ring-1 border border-electron-input-border`}/>

                </div>

            }
        </>
    )

}