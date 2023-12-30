import logoSVG from "../../assets/images/logo-electron.svg";
import logSVGdark from "../../assets/images/logo-electron-black.svg";
import {Link} from "react-router-dom";

interface ElectronLogoProps {
    dark: boolean;
}

export const ElectronLogo = (props: ElectronLogoProps) => {


    return (

        <div className={'flex justify-center'}>
            <Link to={"/"}>
                {props.dark ?
                    <img src={logSVGdark} alt={'electron logoSVG'}/>
                    :
                    <img src={logoSVG} alt={'electron logoSVG'}/>
                }
            </Link>
        </div>
    )
}