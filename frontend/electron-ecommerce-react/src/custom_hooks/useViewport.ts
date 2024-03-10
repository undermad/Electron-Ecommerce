import {useEffect, useState} from "react";

export const useViewport = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])


    return width;
}
