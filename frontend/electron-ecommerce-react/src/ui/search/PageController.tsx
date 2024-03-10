import {useEffect, useState} from "react";
import {PageNumber} from "./PageNumber.tsx";

type PageControllerProps = {
    totalPages: number,
    pageNo: number,
    fetchProducts: (pageNo?: number) =>  Promise<void>;
}

export const PageController = ({totalPages, pageNo, fetchProducts}: PageControllerProps) => {

    // const fetchProducts = useFetchProducts();
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // for a smooth scrolling
            });
        })
    }


    const handleNextPageRequestClick = () => {
        if(pageNo === totalPages) return;

        setLoading(true);
        fetchProducts(pageNo).then(() => {
            setLoading(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // for a smooth scrolling
            });
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
                                <div key={index} className="flex">
                                    <p className={`p-[12px] font-[500] text-[14px] leading-5 text-electron-other-page}`}>...</p>
                                    <PageNumber loading={loading}
                                                currentPage={page === pageNo}
                                                fetchProducts={fetchProducts}
                                                pageNo={page}/>
                                </div>
                            )
                        } else {
                            return (
                                <PageNumber loading={loading}
                                            currentPage={page === pageNo}
                                            pageNo={page}
                                            fetchProducts={fetchProducts}
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