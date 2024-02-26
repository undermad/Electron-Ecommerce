import {ExpandingButton} from "./ExpandingButton.tsx";
import {UserSvg} from "../../assets/icons/UserSvg.tsx";
import {ACCOUNT_ROUTE, LOGOUT_ROUTE, ORDER_NESTED_ROUTE} from "../../constants/Routes.ts";

export const AccountFunctions = () => {
    const items: Map<string, string> = new Map();
    items.set('My Account', `${ACCOUNT_ROUTE}/${ORDER_NESTED_ROUTE}`);
    items.set('Logout', LOGOUT_ROUTE);

    return (
        <ExpandingButton sideIcon={true} items={items} name="My Account" svg={<UserSvg/>}/>
    )
}