import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RangeSlider} from "../reusable/RangeSlider.tsx";
import {Span} from "../reusable/Span.tsx";
import {CheckboxInput} from "../reusable/CheckboxInput.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import {ChangeEvent, useEffect, useState} from "react";

// {
//     "filters":{
//
//     "Brand": [
//         "CORSAIR",
//         "KINGSTON"
//     ],
//         "Module type": [
//         "DDR4",
//         "DDR5"
//     ],
//         "Memory capacity": [
//         "8 GB",
//         "16 GB",
//         "32 GB",
//         "64 GB"
//     ]
// }
// }

type FilterProps = {
    filters: Map<string, string[]>,
    maxPrice: number,
}


export const Filter = ({filters, maxPrice}: FilterProps) => {

    const [requiredFilters, setRequiredFilters] = useState<Map<string, string[]>>(new Map<string, string[]>);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        Object.entries(filters).forEach(([key, value]) => {
            value.forEach((val: string) => {
                if (e.target.name === val) {
                    const arr = requiredFilters.get(key);
                    if (arr && e.target.checked) arr.push(val);
                    if (arr && !e.target.checked) {
                        const idx = arr.indexOf(val);
                        if(idx !== -1) arr.splice(idx, 1);
                    }
                    console.log(arr)
                    console.log(requiredFilters)

                }
            })
        })


    };

    useEffect(() => {
        const newVariations = new Map<string, string[]>;
        Object.entries(filters).forEach(([key]) => {
            newVariations.set(key, []);
        })
        setRequiredFilters(newVariations);
        console.log(requiredFilters);
        console.log(filters)
    }, [filters]);

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
                        {filterValues.map((value: string, key: number) => (
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