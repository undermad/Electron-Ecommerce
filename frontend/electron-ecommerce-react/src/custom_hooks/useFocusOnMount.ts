import {RefObject, useEffect} from "react";

function useFocusOnMount(ref: RefObject<HTMLElement>) {
    useEffect(() => {
        if (ref.current !== null) ref.current.focus();
    }, [ref])
}
export default useFocusOnMount;