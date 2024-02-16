import {useParams} from "react-router-dom";
import {Container} from "../reusable/Container.tsx";
import {useEffect} from "react";
import {axiosCategory} from "../../api/axios.ts";
import {PageableProductList} from "./PageableProductList.tsx";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {useMessageScreen} from "../../custom_hooks/useMessageScreen.ts";
import {FilterSection} from "./FilterSection.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Filter} from "./Filter.tsx";
import {Header3} from "../reusable/Header3.tsx";
import {ParagraphSmall} from "../reusable/ParagraphSmall.tsx";


export const Search = () => {
    const param = useParams();
    const category = param.category;
    const productContext = useProductList();
    const messageScreen = useMessageScreen();

    const screenWidth = useViewport();

    useEffect(() => {
        if (productContext?.categoryResponse.name !== category) {
            axiosCategory.get(`/${category}`)
                .then(response => {
                    productContext?.setCategoryResponse({...response.data});
                    const newVariations = new Map<string, string[]>;
                    Object.entries(response.data.filters).forEach(([key]) => {
                        newVariations.set(key, []);
                    })
                    productContext?.setFilters(newVariations);
                    productContext?.setPriceValues([0, response.data?.maxPrice])
                })
                .catch(error => {
                    messageScreen(error.response.data.message);
                })
        }
    }, [category])

    return (
        <Container>

            {screenWidth >= Breakpoints.LARGE
                ?
                <div className={"flex gap-[42px] w-full"}>
                    <div className={"w-1/4 flex flex-col gap-5"}>
                            <div className="flex flex-col pl-4">
                                <Header3>Filters</Header3>
                                <ParagraphSmall tailwind="text-[14px]">Apply filters to table data</ParagraphSmall>
                            </div>
                            <Filter/>
                    </div>
                    <PageableProductList/>
                </div>
                :
                <div>
                    <FilterSection/>
                    <PageableProductList/>
                </div>
            }


        </Container>
    )
}