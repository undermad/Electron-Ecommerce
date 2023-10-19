import {Link} from "react-router-dom";

interface CategoryLinkProps {
    children: React.ReactNode;
}

export const CategoryLink = (props: CategoryLinkProps) => {

    return (
        <li className={"mb-2 hover:scale-105"}>
            <Link to={'/search'}>{props.children}</Link>
        </li>
    )
}