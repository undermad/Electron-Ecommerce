import {Bold} from "../reusable/Bold.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";

type ProductViewTittleProps = {
    name: string,
    description: string,
}

export const ProductViewTittle = ({name, description}: ProductViewTittleProps) => {

    return (
        <div className="flex flex-col gap-[8px]">
            <Bold leading={8} textSize={28} weight={600}>{name}</Bold>
            <ParagraphSmall tailwind="text-[16px]">{description}</ParagraphSmall>
        </div>
    )
}