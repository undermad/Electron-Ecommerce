
type PageNumberProps = {
    pageNo: number,
    currentPage: boolean,
    loading: boolean,
    fetchProducts: (pageNo?: number) => Promise<void>;
}

export const PageNumber = ({pageNo, currentPage, loading, fetchProducts}: PageNumberProps) => {


    const handleClick = () => {
        fetchProducts(pageNo - 1);
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