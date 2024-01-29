import {ArrowDown} from "../../assets/icons/ArrowDown.tsx";
import {CrossSvg} from '../../assets/icons/CrossSvg.tsx';
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {ReactNode, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {ExpandingListItem} from "./ExpandingListItem.tsx";
import {SmallSvgIcon} from "../../assets/icons/SmallSvgIcon.tsx";
import {HoverScale} from "../reusable/HoverScale.tsx";

type ExpandingButtonProps = {
    items: Map<string, string>,
    name: string,
    svg: ReactNode,
    sideIcon?: boolean,
}

export const ExpandingButton = (props: ExpandingButtonProps) => {

    const width = useViewport();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const itemsList: Map<string, string> = props.items;


    const expand = () => {
        setIsExpanded(!isExpanded);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current?.contains(event.target as Node)) {
            setIsExpanded(false);
        }
    }

    const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Prevent the window click event from being triggered
        event.stopPropagation();
        expand();
    }

    useEffect(() => {
        if (isExpanded) window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [isExpanded]);


    return (
        <div
            ref={buttonRef}
            className={"flex gap-[24px] items-center"}
            onClick={handleButtonClick}>

            {width < Breakpoints.LARGE &&
                <section>
                    {!isExpanded ?
                        <SmallSvgIcon>
                            {props.svg}
                        </SmallSvgIcon>
                        :
                        <SmallSvgIcon>
                            <CrossSvg/>
                        </SmallSvgIcon>
                    }


                    <motion.div
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : -100,
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        className={`${isExpanded ? '' : 'hidden'} absolute left-0 top-full w-full bg-electron-primary-dark-blue`}>

                        <ul className={"flex flex-col items-center"}>
                            {Array.from(itemsList).map(([key, value]) => (
                                <ExpandingListItem key={key} route={value}>{key}</ExpandingListItem>
                            ))}
                        </ul>
                    </motion.div>
                </section>
            }

            {width >= Breakpoints.LARGE &&
                <section className={'relative'}>

                    <HoverScale>
                        <div className={"flex gap-[6px] items-center cursor-pointer"}>
                            {props?.sideIcon ?
                                <SmallSvgIcon>
                                    {props.svg}
                                </SmallSvgIcon> : ''
                            }
                            <span className={"h-10px"}>{props.name}</span>
                            <motion.div
                                animate={{
                                    rotate: isExpanded ? 180 : 0,
                                }}>
                                <SmallSvgIcon>
                                    <ArrowDown/>
                                </SmallSvgIcon>
                            </motion.div>
                        </div>
                    </HoverScale>

                    <motion.div
                        animate={{
                            y: isExpanded ? 0 : -100,
                            opacity: isExpanded ? 1 : 0,
                        }}
                        className={`${isExpanded ? '' : 'hidden'} absolute w-44 top-[50px] bg-electron-primary-dark-blue p-5`}>

                        {Array.from(itemsList).map(([key, value]) => (
                            <ExpandingListItem key={key} route={value}>{key}</ExpandingListItem>
                        ))}
                    </motion.div>
                </section>
            }

        </div>

    )
}