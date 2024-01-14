import {SearchBar} from "./SearchBar.tsx";
import {ElectronLogo} from "./ElectronLogo.tsx";
import {BasketLink} from "./BasketLink.tsx";
import {Account} from "./Account.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Categories} from "./Categories.tsx";

export const NavigationBar = () => {

    const width = useViewport();


    return (
        <nav
            className={"relative text-[14px] leading-6 font-light flex items-center w-full max-w-[1440px] gap-[24px] text-electron-primary-white bg-electron-primary-dark-blue px-responsive-electron py-4 sm:py-2 md:py-3 lg:py-4 z-40"}>

            {width >= Breakpoints.LARGE ?
                // DESKTOP
                <>
                    <div className={"flex gap-[60px] "}>
                        <ElectronLogo dark={false}/>
                        <Categories/>
                    </div>
                    <SearchBar/>
                    <Account/>
                    <BasketLink/>
                </>
                :
                // MOBILE
                <>
                    <ElectronLogo dark={false}/>
                    <SearchBar/>
                    <BasketLink/>
                    <Account/>
                    <Categories/>

                </>

            }
        </nav>
    )
}