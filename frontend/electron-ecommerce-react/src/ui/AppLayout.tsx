import {Outlet} from "react-router-dom";
import {NavigationBar} from "./nav/NavigationBar.tsx";
import {Footer} from "./footer/Footer.tsx";
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext.tsx";
import {NewsletterBanner} from "./footer/NewsletterBanner.tsx";

export const AppLayout = () => {

    const themeContext = useContext(ThemeContext);


    return (
        <>
            <div className="flex justify-center w-full bg-electron-primary-dark-blue">
                <NavigationBar/>
            </div>
            <div className={"font-inter flex items-center flex-col w-full gap-[24px]"}>
                {themeContext?.fadeAwayBackground ?
                    <div className="fixed bg-black bg-opacity-75 w-full h-full"/>
                    : ''}

                <Outlet/>
                <NewsletterBanner/>
                <Footer/>
            </div>
        </>
    )
}