import {Container} from "../reusable/Container.tsx";
import {PageableProductList} from "./PageableProductList.tsx";
import {useProductList} from "../../custom_hooks/useProductList.ts";
import {useViewport} from "../../custom_hooks/useViewport.ts";


export const SearchByQuery = () => {
    const productContext = useProductList();
    const screenWidth = useViewport();



    return (
        <Container>
            <PageableProductList/>
        </Container>
    )
}