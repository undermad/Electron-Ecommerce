import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RangeSlider} from "../reusable/RangeSlider.tsx";
import {Span} from "../reusable/Span.tsx";
import {ChangeEvent, useState} from "react";
import {CheckboxInput} from "../reusable/CheckboxInput.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";

type FilterProps = {
    filters: { [key: string]: string[] },
    maxPrice: number
}

type RequiredFilters = {
    filters: string[],
}

export const Filter = ({filters, maxPrice}: FilterProps) => {

    const [requiredFilters, setRequiredFilters] = useState<RequiredFilters>({filters: []});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const filter = e.target.name;
        setRequiredFilters((prevFilter) => {
            if (prevFilter.filters.includes(filter)) {
                return {filters: prevFilter.filters.filter((f) => f !== filter)};
            } else {
                return {filters: [...prevFilter.filters, filter]};
            }
        })

        console.log(requiredFilters);
    };


    return (
        <div className={"w-1/4 flex flex-col gap-[24px]"}>

            <div>
                <Header3>Filters</Header3>
                <ParagraphSmall tailwind="text-[14px]">Apply filters to table data</ParagraphSmall>
            </div>

            <ParagraphSmall tailwind="text-[14px]">Price</ParagraphSmall>
            <RangeSlider minRange={0} maxRange={maxPrice}/>


            {Object.entries(filters).map(([filterName, filterValues]) => (
                <div key={filterName} className={"flex flex-col gap-[16px]"}>
                    <Span>{filterName}</Span>
                    <div className={"pl-[16px] flex flex-col gap-[12px]"}>
                        {filterValues.map((value, key) => (
                            <LabelCheckboxHolder key={key}>
                                <CheckboxInput
                                    type={"checkbox"}
                                    id={value}
                                    name={value}
                                    callback={handleInputChange}/>
                                <CheckboxLabel htmlFor={value}>
                                    {value}
                                </CheckboxLabel>
                            </LabelCheckboxHolder>


                        ))}
                    </div>
                </div>

            ))}

        </div>
    )
}