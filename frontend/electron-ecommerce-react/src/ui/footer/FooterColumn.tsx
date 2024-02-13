import {Link} from "react-router-dom";

type FooterColumnProps = {
    name: string,
    links: Map<string, string>,
    applicationLinks: boolean
}

export const FooterColumn = ({name, links, applicationLinks}: FooterColumnProps) => {


    return (
        <div className="flex flex-col gap-[16px]">
            <span className={"text-[14px] text-electron-placeholder-grey font-[600]"}>{name}</span>
            <ul className="flex flex-col gap-[12px]">
                {Array.from(links).map(([key, value]) => (
                    applicationLinks ?
                        <Link to={value}>
                            <li className="text-[16px] font-[600] text-electron-other-page">{key}</li>
                        </Link>
                        :
                        <a href={value}>
                            <li className="text-[16px] font-[600] text-electron-other-page">{key}</li>
                        </a>
                ))}

            </ul>
        </div>

    )
}