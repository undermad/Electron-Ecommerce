import {useEffect, useState} from "react";

export const useViewport = () => {

    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth > 1024 ) {
                setWidth(1024);
            } else if (window.innerWidth <= 1024 && window.innerWidth > 640){
                setWidth(640);
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