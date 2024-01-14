import {Route, Routes} from "react-router-dom";
import {AppLayout} from "./ui/AppLayout.tsx";
import {Search} from "./ui/search/Search.tsx";
import {Basket} from "./ui/basket/Basket.tsx";
import {Home} from "./ui/home/Home.tsx";
import {Login} from "./ui/account/Login.tsx";
import {Missing} from "./ui/global/Missing.tsx";
import {
    LOGIN_ROUTE,
    BASKET_ROUTE,
    HOME_ROUTE,
    SEARCH_ROUTE,
    ADMIN_ROUTE,
    UNAUTHORIZED_ROUTE, MESSAGE_SCREEN_ROUTE, ACCOUNT_ROUTE, LOGOUT_ROUTE
} from "./constants/Routes.ts";
import {RequireAuth} from "./ui/RequireAuth.tsx";
import {ROLE_ADMIN, ROLE_USER} from "./constants/UserRoles.ts";
import {Admin} from "./ui/admin/Admin.tsx";
import {Unauthorized} from "./ui/global/Unauthorized.tsx";
import {PersistLogin} from "./ui/PersistLogin.tsx";
import {MessageScreen} from "./ui/global/MessageScreen.tsx";
import {MyAccount} from "./ui/account/MyAccount.tsx";
import {Logout} from "./ui/account/Logout.tsx";

function App() {

    return (
        <Routes>
            <Route path={HOME_ROUTE} element={<AppLayout/>}>
                <Route element={<PersistLogin/>}>

                    {/*public routes*/}
                    <Route path={HOME_ROUTE} element={<Home/>}></Route>
                    <Route path={SEARCH_ROUTE} element={<Search/>}>

                    </Route>

                    <Route path={LOGIN_ROUTE} element={<Login/>}/>


                    {/*user protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[ROLE_USER]}/>}>
                        <Route path={ACCOUNT_ROUTE} element={<MyAccount/>}/>
                        <Route path={BASKET_ROUTE} element={<Basket/>}/>
                        <Route path={LOGOUT_ROUTE} element={<Logout/>}/>
                    </Route>


                    {/*admin protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[ROLE_ADMIN]}/>}>
                        <Route path={ADMIN_ROUTE} element={<Admin/>}/>
                    </Route>

                    <Route path={UNAUTHORIZED_ROUTE} element={<Unauthorized/>}/>

                    {/*message screen*/}
                    <Route path={MESSAGE_SCREEN_ROUTE} element={<MessageScreen/>}/>

                    {/*error*/}
                    <Route path={"*"} element={<Missing/>}/>

                </Route>
            </Route>
        </Routes>
    )
}

export default App
