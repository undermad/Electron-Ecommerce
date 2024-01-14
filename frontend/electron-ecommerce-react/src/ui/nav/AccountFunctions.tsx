import {ExpandingButton} from "./ExpandingButton.tsx";
import {UserSvg} from "../../assets/icons/UserSvg.tsx";

export const AccountFunctions = () => {
    const items: string[] = ['My Account', 'Orders', 'Logout'];


    return (
        <ExpandingButton items={items} name="Account" svg={<UserSvg/>}/>
    )
}