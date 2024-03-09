import {SearchBar} from "./SearchBar.tsx";
import {BasketLink} from "./BasketLink.tsx";
import {AccountLink} from "./AccountLink.tsx";
import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Categories} from "./Categories.tsx";
import {ElectronLogoSvg} from "../../assets/images/ElectronLogoSvg.tsx";

export const NavigationBar = () => {

    const width = useViewport();


    return (
        <nav
            className={"w-full max-w-[1440px] relative text-[14px] leading-6 font-light flex justify-center items-center gap-[24px] text-electron-primary-white bg-electron-primary-dark-blue px-responsive-electron py-4 sm:py-2 md:py-3 lg:py-4 z-40"}>

            {width >= Breakpoints.LARGE ?
                // DESKTOP
                <>
                    <div className={"flex gap-[60px] "}>
                        <ElectronLogoSvg  dark={false}/>
                        <Categories/>
                    </div>
                    <SearchBar/>
                    <AccountLink/>
                    <BasketLink/>
                </>
                :
                // MOBILE
                <>
                    <ElectronLogoSvg dark={false} />
                    <SearchBar/>
                    <BasketLink/>
                    <AccountLink/>
                    <Categories/>

                </>

            }
        </nav>
    )
}