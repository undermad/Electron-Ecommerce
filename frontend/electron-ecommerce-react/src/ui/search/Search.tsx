import {useParams} from "react-router-dom";
import {Container} from "../reusable/Container.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {Span} from "../reusable/Span.tsx";
import {RangeSlider} from "../reusable/RangeSlider.tsx";


export const Search = () => {
    const param = useParams();
    const category = param.category;



    return (

        <Container>
            <div className={"flex gap-[42px] w-full mt-[24px]"}>

                <div className={"w-1/4 flex flex-col gap-[24px]"}>

                    <div>
                        <Header3>Filters</Header3>
                        <ParagraphSmall tailwind="text-[14px]">Apply filters to table data</ParagraphSmall>
                    </div>

                    <ParagraphSmall tailwind="text-[14px]">Price</ParagraphSmall>


                    <RangeSlider minRange={100} maxRange={200} />




                    <div className={"flex flex-col gap-[16px]"}>
                        <Span>VariationName</Span>
                        <p className={"pl-[16px] flex flex-col gap-[12px]"}>
                            <Span>VariationOption</Span>
                            <Span>VariationOption</Span>
                            <Span>VariationOption</Span>
                            <Span>VariationOption</Span>
                            <Span>VariationOption</Span>
                            <Span>VariationOption</Span>
                        </p>
                    </div>
                    
                    
                    
                </div>


                <div className={"w-3/4 h-screen bg-electron-primary-dark-blue"}>products</div>
            </div>
        </Container>
    )
}