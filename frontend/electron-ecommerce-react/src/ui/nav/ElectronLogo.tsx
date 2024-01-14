import {ElectronLogoSvgBright} from "../../assets/images/ElectronLogoSvgBright.tsx";
import {ElectronLogoSvgDark} from "../../assets/images/ElectronLogoSvgDark.tsx";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../constants/Routes.ts";

interface ElectronLogoProps {
    dark: boolean;
}

export const ElectronLogo = (props: ElectronLogoProps) => {


    return (

        <div className={'flex justify-center'}>
            <Link to={HOME_ROUTE}>
                {props.dark ?
                    <ElectronLogoSvgDark/>
                    :
                    <ElectronLogoSvgBright/>
                }
            </Link>
        </div>
    )
}