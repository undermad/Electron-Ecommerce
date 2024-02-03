import {useEffect, useState} from "react";
import {PageNumber} from "./PageNumber.tsx";
import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";

type PageControllerProps = {
    totalPages: number,
    pageNo: number
}

export const PageController = ({totalPages, pageNo}: PageControllerProps) => {

    const fetchProducts = useFetchProducts();
    const [pages, setPages] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    function createArray(pageNo: number, totalPages: number): number[] {
        const array: number[] = [1];
        if (pageNo - 2 >= 1) {
            array.push(pageNo - 1);
            array.push(pageNo)
            if (pageNo != totalPages) {
                array.push(pageNo + 1);
            }
        } else {
            if (pageNo != 1) array.push(pageNo)
            for (let i = 1; i < 3 && i + pageNo < totalPages; i++) {
                array.push(pageNo + i)
            }
        }
        if (!array.includes(totalPages)) array.push(totalPages);
        return array;
    }


    const handlePreviousPageClick = () => {
        if(pageNo === 1) return;
        setLoading(true);
        fetchProducts(pageNo - 2).then(() => {
            setLoading(false);
        })
    }


    const handleNextPageRequestClick = () => {
        if(pageNo === totalPages) return;
        setLoading(true);
        fetchProducts(pageNo).then(() => {
            setLoading(false);
        })
    }


    useEffect(() => {
        setPages(createArray(pageNo, totalPages))
    }, [totalPages, pageNo]);

    return (
        <div className="flex justify-between">

                <button onClick={handlePreviousPageClick} disabled={loading}>
                    Prev
                </button>
            <div className="flex gap-5">

                {pages.map((page, index) => {
                        const isFirstElement = index === 0;
                        const isPrevElInSequence = !isFirstElement && (page === pages[index - 1] + 1);
                        if (!isPrevElInSequence && !isFirstElement) {
                            return (
                                <div key={index}>
                                    <PageNumber loading={loading} currentPage={false} text="..."></PageNumber>
                                    <PageNumber loading={loading}
                                                currentPage={page === pageNo}
                                                text={page}/>
                                </div>
                            )
                        } else {
                            return (
                                <PageNumber loading={loading}
                                            currentPage={page === pageNo}
                                            text={page}
                                            key={index}/>
                            )
                        }
                    }
                )}
            </div>

            <button onClick={handleNextPageRequestClick} disabled={loading}>
                Next
            </button>
        </div>
    )
}