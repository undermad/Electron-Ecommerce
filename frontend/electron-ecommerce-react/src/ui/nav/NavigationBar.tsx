import {SearchBar} from "./SearchBar.tsx";
import {ElectronLogo} from "./ElectronLogo.tsx";
import {CategoriesList} from "./CategoriesList.tsx";
import {BasketLink} from "./BasketLink.tsx";
import {Account} from "./Account.tsx";
import {useViewport} from "../custom_hooks/CustomHooks.ts";
import {Breakpoints} from "../custom_hooks/Breakpoints.ts";

export const NavigationBar = () => {

    const width = useViewport();


    return (
        <nav
            className={"relative text-[14px] leading-6 font-light flex items-center w-full max-w-[1440px] gap-[24px] text-electron-primary-white bg-electron-primary-dark-blue px-responsive-electron py-4 sm:py-2 md:py-3 lg:py-4"}>

            {width >= Breakpoints.LARGE ?
                // DESKTOP
                <>
                    <div className={"flex gap-[60px] "}>
                        <ElectronLogo/>
                        <CategoriesList/>
                    </div>
                    <SearchBar/>
                    <Account/>
                    <BasketLink/>
                </>
                :
                // MOBILE
                <>
                    <ElectronLogo/>
                    <SearchBar/>
                    <Account/>
                    <BasketLink/>
                    <CategoriesList/>

                </>

            }
        </nav>
    )
}