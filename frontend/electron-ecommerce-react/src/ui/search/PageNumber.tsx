import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";

type PageNumberProps = {
    pageNo: number,
    currentPage: boolean,
    loading: boolean,
}

export const PageNumber = ({pageNo, currentPage, loading}: PageNumberProps) => {

    const fetchProducts = useFetchProducts();

    const handleClick = () => {
        console.log(pageNo)
        fetchProducts(pageNo);
    }

    return (
        <button
            className={`p-[12px] font-[${currentPage ? '600' : '500'}] text-[14px] leading-5 text-${currentPage ? 'electron-current-page' : 'electron-other-page'}`}
            onClick={handleClick}
            disabled={loading}
        >
            {pageNo}
        </button>
    )
}