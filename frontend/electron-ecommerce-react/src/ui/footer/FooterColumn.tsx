import {Link} from "react-router-dom";

type FooterColumnProps = {
    name: string,
    links: Map<string, string>,
}

export const FooterColumn = ({name, links}: FooterColumnProps) => {


    return (
        <div className="flex flex-col gap-[16px]">
            <span className={"text-[14px] text-electron-placeholder-grey font-[600]"}>{name}</span>
            <ul className="flex flex-col gap-[12px]">
                {Array.from(links).map(([key, value]) => (
                    <Link to={value}>
                        <li className="text-[16px] font-[600] text-electron-other-page">{key}</li>
                    </Link>
                ))}

            </ul>
        </div>

    )
}