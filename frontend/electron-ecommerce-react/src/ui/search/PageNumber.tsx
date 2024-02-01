type PageNumberProps = {
    text: string | number,
    currentPage: boolean
}

export const PageNumber = ({text, currentPage}: PageNumberProps) => {

    return (
        <p className={`p-[12px] font-[${currentPage ? '600' : '500'}] text-[14px] leading-5 text-${currentPage ? 'electron-current-page' : 'electron-other-page'}`}>
            {text}
        </p>
    )
}