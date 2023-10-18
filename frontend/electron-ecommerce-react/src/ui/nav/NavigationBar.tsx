import {SearchBar} from "./SearchBar.tsx";
import {ElectronLogo} from "./ElectronLogo.tsx";
import {CategoriesList} from "./CategoriesList.tsx";
import {UserLinks} from "./UserLinks.tsx";
import {ShoppingCart} from "./ShoppingCart.tsx";
import {Account} from "./Account.tsx";
import {useViewport} from "../custom_hooks/CustomHooks.ts";

export const NavigationBar = () => {

    const width = useViewport();





    return (
        <nav
            className={"text-[14px] leading-6 font-light flex items-center w-full max-w-[1440px] gap-[24px] text-electron-primary-white bg-electron-primary-dark-blue px-responsive-electron py-4 sm:py-2 md:py-3 lg:py-4 relative"}>

            {width >= 1024  ?
                // DESKTOP
                <>
                    <div className={"flex gap-[60px] "}>
                        <ElectronLogo/>
                        <CategoriesList/>
                    </div>

                    <SearchBar/>

                    <UserLinks>
                        <Account/>
                        <ShoppingCart/>
                    </UserLinks>
                </>
                :

                // MOBILE
                <>
                    <ElectronLogo/>
                    <SearchBar/>

                    <UserLinks>
                        <Account/>
                        <ShoppingCart/>
                        <CategoriesList/>
                    </UserLinks>

                </>

            }
        </nav>
    )
}