import {useEffect, useState} from "react";
import {PageNumber} from "./PageNumber.tsx";

type PageControllerProps = {
    totalPages: number | undefined,
    pageNo: number | undefined

}

export const PageController = ({totalPages, pageNo}: PageControllerProps) => {

    const [pages, setPages] = useState<number[]>([]);

    function createArray(totalPages: number, pageNo: number): number[] {
        const array: number[] = [1];
        if (pageNo - 2 >= 1) {
            array.push(pageNo - 1);
            array.push(pageNo)
            if (pageNo != totalPages) {
                array.push(pageNo + 1);
            }
        } else {
            if (pageNo != 1) array.push(pageNo)
            for (let i = 1; i < 3 && i < totalPages; i++) {
                array.push(pageNo + i)
            }
        }
        if(!array.includes(totalPages)) array.push(totalPages);
        return array;
    }

    useEffect(() => {
        if (totalPages && pageNo) setPages(createArray(totalPages, pageNo))
    }, [totalPages, pageNo]);

    return (
        <div className="flex justify-between">
            <button>

                Prev
            </button>
            <div className="flex gap-5">

                {pages.map((page, index) => {
                    const isFirstElement = index === 0;
                    const isPrevElInSequence = !isFirstElement && (page === pages[index - 1] + 1);
                    if (!isPrevElInSequence && !isFirstElement) {
                        return (
                            <>
                                <PageNumber currentPage={false} text="..." ></PageNumber>
                                <PageNumber currentPage={page === pageNo} text={page} key={index}/>
                            </>
                        )
                    } else {
                        return (
                            <PageNumber currentPage={page === pageNo} text={page} key={index}/>
                        )
                    }
                }
                )}
                </div>

                    <button>
                        Next
                    </button>
                </div>
                )
                }