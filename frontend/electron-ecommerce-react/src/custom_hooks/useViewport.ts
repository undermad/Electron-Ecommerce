import {useEffect, useState} from "react";
import {Breakpoints} from "../constants/Breakpoints.ts";

export const useViewport = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth > Breakpoints.LARGE ) {
                setWidth(Breakpoints.LARGE);
            } else if (window.innerWidth <= Breakpoints.LARGE && window.innerWidth > Breakpoints.SMALL){
                setWidth(Breakpoints.SMALL);
            } else {
                setWidth(0);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    return width;
}
