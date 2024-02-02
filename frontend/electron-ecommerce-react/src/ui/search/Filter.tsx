import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RangeSlider} from "../reusable/RangeSlider.tsx";
import {Span} from "../reusable/Span.tsx";
import {CheckboxInput} from "../reusable/CheckboxInput.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import {ChangeEvent, useEffect} from "react";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";
import {render} from "react-dom";

type FilterProps = {
    filters: Map<string, string[]> | undefined,
    maxPrice: number | undefined,
}

export const Filter = ({filters, maxPrice}: FilterProps) => {

    const productContext = useProductList();
    const fetchProducts = useFetchProducts();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (filters)
            Object.entries(filters).forEach(([key, value]) => {
                value.forEach((val: string) => {
                    if (e.target.name === val) {
                        const arr = productContext?.filters?.get(key);
                        if (arr && e.target.checked) arr.push(val);
                        if (arr && !e.target.checked) {
                            const idx = arr.indexOf(val);
                            if (idx !== -1) arr.splice(idx, 1);
                        }
                    }
                })
            })
        fetchProducts();
    };

    const handlePriceChange = (newValues: number[]) => {
        productContext?.setPriceValues(newValues);
    }

    useEffect(() => {
        const newVariations = new Map<string, string[]>;
        if (filters)
            Object.entries(filters).forEach(([key]) => {
                newVariations.set(key, []);
            })
        productContext?.setFilters(newVariations);
        if (maxPrice)
            productContext?.setPriceValues([0, maxPrice])
        fetchProducts();


    }, [filters]);

    return (
        <div className={"w-1/4 flex flex-col gap-[24px]"}>

            <div>
                <Header3>Filters</Header3>
                <ParagraphSmall tailwind="text-[14px]">Apply filters to table data</ParagraphSmall>
            </div>

            <ParagraphSmall tailwind="text-[14px]">Price</ParagraphSmall>
            {maxPrice &&
                <RangeSlider minRange={0} maxRange={maxPrice} callback={handlePriceChange}/>}


            {filters &&
                Object.entries(filters).map(([filterName, filterValues]) => (
                    <div key={filterValues} className={"flex flex-col gap-[16px]"}>
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