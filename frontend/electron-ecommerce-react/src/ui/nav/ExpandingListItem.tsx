import {Link} from "react-router-dom";

interface CategoryLinkProps {
    children: React.ReactNode;
    route: string,

}

export const ExpandingListItem = (props: CategoryLinkProps) => {

    return (
        <div className={"mb-2 hover:scale-105"}>
            <Link to={props.route}>{props.children}</Link>
        </div>
    )
}