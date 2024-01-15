import {Outlet} from "react-router-dom";
import {NavigationBar} from "./nav/NavigationBar.tsx";
import {Footer} from "./footer/Footer.tsx";

export const AppLayout = () => {


    return (
        <div className={"font-inter flex items-center flex-col w-full"}>
                <NavigationBar/>
                <Outlet/>
                <Footer/>
        </div>
    )
}