import logoSVG from "../../assets/images/logo-electron.svg";
import {Link} from "react-router-dom";

export const ElectronLogo = () => {


    return (

        <div className={'flex'}>
            <Link to={"/"}>
                <img src={logoSVG} alt={'electron logoSVG'}/>
            </Link>
        </div>
    )
}