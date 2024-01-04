import {Outlet} from "react-router-dom";
import {NavigationBar} from "./nav/NavigationBar.tsx";
import {Footer} from "./footer/Footer.tsx";
import { AuthContextProvider} from "./context/AuthContext.tsx";

export const AppLayout = () => {


    return (
        <div className={"font-inter flex items-center flex-col "}>
            <AuthContextProvider>
                <NavigationBar/>
                <Outlet/>
                <Footer/>
            </AuthContextProvider>
        </div>
    )
}