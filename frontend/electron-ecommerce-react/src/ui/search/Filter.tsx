import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {PriceRange} from "../reusable/PriceRange.tsx";
import {Span} from "../reusable/Span.tsx";
import {CheckboxInput} from "../reusable/CheckboxInput.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";

export const Filter = () => {

    const productContext = useProductList();
    const fetchProducts = useFetchProducts();

    const [filters, setFilters] = useState<Map<string, string[]> | undefined>(new Map<string, string[]>);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(filters)
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

    const check = (param: string) => {
        let result = false;
        productContext?.filters?.forEach(value => {
            value.forEach(val => {
                if(val === param) result = true;
            })
        })
        return result;
    }


    useEffect(() => {
        setFilters(productContext?.categoryResponse.filters);
        fetchProducts();
    }, [productContext?.categoryResponse.name]);

    return (
        <aside className={"w-full flex flex-col gap-[24px] overflow-y-auto pl-4"}>

            <ParagraphSmall tailwind="text-[14px]">Price</ParagraphSmall>
            { productContext?.categoryResponse.maxPrice &&
                <PriceRange minRange={0} maxRange={productContext?.categoryResponse.maxPrice} callback={handlePriceChange}/>}


            {filters &&
                Object.entries(filters).map(([filterName, filterValues]) => (
                    <figure key={filterValues} className={"flex flex-col gap-[16px] "}>
                        <Span>{filterName}</Span>
                        <div className={"pl-[16px] flex flex-col gap-[12px]"}>
                            {filterValues.map((value: string, key: number) => (
                                <LabelCheckboxHolder key={key}>
                                    <CheckboxInput
                                        type={"checkbox"}
                                        id={value}
                                        name={value}
                                        checked={check(value)}
                                        callback={handleInputChange}/>
                                    <CheckboxLabel htmlFor={value}>
                                        {value}
                                    </CheckboxLabel>
                                </LabelCheckboxHolder>


                            ))}
                        </div>
                    </figure>

                ))}

        </aside>
    )
}