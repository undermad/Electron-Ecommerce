import {Outlet} from "react-router-dom";
import {NavigationBar} from "./nav/NavigationBar.tsx";
import {Footer} from "./footer/Footer.tsx";
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext.tsx";

export const AppLayout = () => {

    const themeContext = useContext(ThemeContext);


    return (
        <div className={"relative font-inter flex items-center flex-col w-full gap-[24px]"}>
            {themeContext?.fadeAwayBackground ?
                <div className="absolute bg-black bg-opacity-75 w-full h-full"/>
                : ''}

            <NavigationBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}