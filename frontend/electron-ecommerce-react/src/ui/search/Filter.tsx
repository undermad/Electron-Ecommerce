import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RangeSlider} from "../reusable/RangeSlider.tsx";
import {Span} from "../reusable/Span.tsx";
import {FiltersDto} from "../../api/dto/FiltersDto.ts";

type FilterProps = {
    filtersData: FiltersDto,
    maxPrice: number
}

export const Filter = ({filtersData, maxPrice}: FilterProps) => {


    return (
        <div className={"w-1/4 flex flex-col gap-[24px]"}>

            <div>
                <Header3>Filters</Header3>
                <ParagraphSmall tailwind="text-[14px]">Apply filters to table data</ParagraphSmall>
            </div>

            <ParagraphSmall tailwind="text-[14px]">Price</ParagraphSmall>


            <RangeSlider minRange={0} maxRange={maxPrice}/>


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
    )
}