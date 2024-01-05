import {Link} from "react-router-dom";
import {SEARCH} from "../../constants/Routes.ts";

interface CategoryLinkProps {
    children: React.ReactNode;
}

export const CategoryLink = (props: CategoryLinkProps) => {

    return (
        <div className={"mb-2 hover:scale-105"}>
            <Link to={SEARCH}>{props.children}</Link>
        </div>
    )
}