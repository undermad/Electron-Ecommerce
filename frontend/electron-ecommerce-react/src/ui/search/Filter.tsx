import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RangeSlider} from "../reusable/RangeSlider.tsx";
import {Span} from "../reusable/Span.tsx";
import {CheckboxInput} from "../reusable/CheckboxInput.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {axiosBase, PRODUCT_CATEGORY_PATH, PRODUCT_WITH_FILTERS_API_PATH} from "../../api/axios.ts";
import {ProductWithFilterRequest} from "../../api/dto/ProductWithFilterRequest.ts";

type FilterProps = {
    filters: Map<string, string[]>,
    maxPrice: number,
    category: string | undefined,
}

export const Filter = ({filters, maxPrice, category}: FilterProps) => {

    const [requiredFilters, setRequiredFilters] = useState<Map<string, string[]>>(new Map<string, string[]>);
    const [priceValues, setPriceValues] = useState([0, maxPrice]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        Object.entries(filters).forEach(([key, value]) => {
            value.forEach((val: string) => {
                if (e.target.name === val) {
                    const arr = requiredFilters.get(key);
                    if (arr && e.target.checked) arr.push(val);
                    if (arr && !e.target.checked) {
                        const idx = arr.indexOf(val);
                        if (idx !== -1) arr.splice(idx, 1);
                    }
                }
            })
        })

        fetchData();
    };

    const handlePriceChange = (newValues: number[]) => {
        setPriceValues(newValues);
    }

    const fetchData = () => {
        const filtersAsJson: { [key: string]: string[] } = {};
        requiredFilters.forEach((value, key) => {
            if (value.length !== 0) {
                filtersAsJson[key] = value;
            }
        });
        const requestData: ProductWithFilterRequest = {
            filters: filtersAsJson,
            minPrice: priceValues[0],
            maxPrice: priceValues[1],
            category: category,
        }
        if (Object.keys(filtersAsJson).length === 0) {
            axiosBase.get(PRODUCT_CATEGORY_PATH + `?category=${category}`)
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            axiosBase.post(PRODUCT_WITH_FILTERS_API_PATH, requestData)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    useEffect(() => {
        const newVariations = new Map<string, string[]>;
        Object.entries(filters).forEach(([key]) => {
            newVariations.set(key, []);
        })
        setRequiredFilters(newVariations);
        setPriceValues([0, maxPrice])
        console.log(requiredFilters);
        console.log(filters)
        fetchData();
    }, [filters]);

    return (
        <div className={"w-1/4 flex flex-col gap-[24px]"}>

            <div>
                <Header3>Filters</Header3>
                <ParagraphSmall tailwind="text-[14px]">Apply filters to table data</ParagraphSmall>
            </div>

            <ParagraphSmall tailwind="text-[14px]">Price</ParagraphSmall>
            <RangeSlider minRange={0} maxRange={maxPrice} callback={handlePriceChange}/>


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