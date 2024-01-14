import {Link} from "react-router-dom";
import {HoverScale} from "../reusable/HoverScale.tsx";

interface CategoryLinkProps {
    children: React.ReactNode;
    route: string,

}

export const ExpandingListItem = (props: CategoryLinkProps) => {

    return (
        <HoverScale>
            <Link to={props.route}>{props.children}</Link>
        </HoverScale>
    )
} 