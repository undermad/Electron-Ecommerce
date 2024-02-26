type ParagraphSmallProps = {
    children: React.ReactNode,
    tailwind?: string,
}

export const ParagraphSmall = ({children, tailwind}: ParagraphSmallProps) => {

    return (
        <p className={"text-[10px] sm:text-[12px] w-full text-electron-input-ash-blue " + tailwind}>
            {children}
        </p>
    )
}