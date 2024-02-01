import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";
import {RangeSlider} from "../reusable/RangeSlider.tsx";
import {Span} from "../reusable/Span.tsx";
import {CheckboxInput} from "../reusable/CheckboxInput.tsx";
import {CheckboxLabel} from "../reusable/CheckboxLabel.tsx";
import {LabelCheckboxHolder} from "../reusable/LabelCheckboxHolder.tsx";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {axiosBase, CATEGORY_API_PATH} from "../../api/axios.ts";
import {ProductWithFilterRequest} from "../../api/dto/product/ProductWithFilterRequest.ts";
import {ProductContext} from "../../context/ProductContext.tsx";
import {useParams} from "react-router-dom";

type FilterProps = {
    filters: Map<string, string[]> | undefined,
    maxPrice: number | undefined,
}

export const Filter = ({filters, maxPrice}: FilterProps) => {

    const param = useParams();
    const category = param.category;
    const productContext = useContext(ProductContext);

    const [priceValues, setPriceValues] = useState([0, maxPrice]);

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

        fetchData();
    };

    const handlePriceChange = (newValues: number[]) => {
        setPriceValues(newValues);
    }

    const fetchData = async () => {
        const filtersAsJson: { [key: string]: string[] } = {};
        productContext?.filters?.forEach((value, key) => {
            if (value.length !== 0) {
                filtersAsJson[key] = value;
            }
        });
        const requestData: ProductWithFilterRequest = {
            filters: filtersAsJson,
            priceRange: {
                minPrice: priceValues[0],
                maxPrice: priceValues[1],
            }
        }
        await axiosBase.post(
            CATEGORY_API_PATH
            + `/${productContext?.categoryResponse.name}`
            + `?pageNo=${productContext?.pageableProductList?.pageNo}`,
            requestData)
            .then(result => {
                productContext?.setPageableProductList({...result.data});
                console.log(result.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (productContext?.categoryResponse.name != category) {
            const newVariations = new Map<string, string[]>;
            if (filters)
                Object.entries(filters).forEach(([key]) => {
                    newVariations.set(key, []);
                })
            productContext?.setFilters(newVariations);
            setPriceValues([0, maxPrice])
        }
        fetchData();
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