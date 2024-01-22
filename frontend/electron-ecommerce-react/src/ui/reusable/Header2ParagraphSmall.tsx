import {Header2} from "./Header2.tsx";
import {ParagraphSmall} from "./ParagraphSmall.tsx";

type Header2ParagraphSmallProps = {
    header: string,
    paragraph: string,
}


export const Header2ParagraphSmall = ({header, paragraph}: Header2ParagraphSmallProps) => {

    return (
        <>
            <Header2>{header}</Header2>
            <ParagraphSmall>{paragraph}</ParagraphSmall>
        </>
    )
}