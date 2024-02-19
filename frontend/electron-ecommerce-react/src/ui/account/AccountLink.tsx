import {HoverScale} from "../reusable/HoverScale.tsx";
import {Span} from "../reusable/Span.tsx";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import {Link} from "react-router-dom";

type AccountLinkProps = {
    route: string,
    displayText: string,
}


export const AccountLink = ({route, displayText}: AccountLinkProps) => {
    return (
        <Link to={route}>
            <HoverScale>
                <div className="cursor-pointer flex justify-between items-center">
                    <Span>{displayText}</Span>
                    <MdOutlineKeyboardArrowRight/>
                </div>
            </HoverScale>
        </Link>
    )
}