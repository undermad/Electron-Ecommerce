type PageNumberProps = {
    text: string | number,
    currentPage: boolean,
    loading: boolean,
}

export const PageNumber = ({text, currentPage, loading}: PageNumberProps) => {


    return (
        <button
            className={`p-[12px] font-[${currentPage ? '600' : '500'}] text-[14px] leading-5 text-${currentPage ? 'electron-current-page' : 'electron-other-page'}`}
            disabled={loading}>
            {text}
        </button>
    )
}