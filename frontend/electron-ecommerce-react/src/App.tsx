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
    UNAUTHORIZED_ROUTE
} from "./constants/Routes.ts";
import {RequireAuth} from "./ui/RequireAuth.tsx";
import {ROLE_ADMIN, ROLE_USER} from "./constants/UserRoles.ts";
import {Admin} from "./ui/admin/Admin.tsx";
import {Unauthorized} from "./ui/global/Unauthorized.tsx";
import {PersistLogin} from "./ui/PersistLogin.tsx";

function App() {


    return (
        <Routes>
            <Route path={HOME_ROUTE} element={<AppLayout/>}>
                <Route element={<PersistLogin/>}>

                    {/*public routes*/}
                    <Route path={HOME_ROUTE} element={<Home/>}></Route>
                    <Route path={SEARCH_ROUTE} element={<Search/>}></Route>
                    <Route path={LOGIN_ROUTE} element={<Login/>}></Route>

                    {/*protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[ROLE_USER]}/>}>
                        <Route path={BASKET_ROUTE} element={<Basket/>}></Route>
                    </Route>

                    {/*admin protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[ROLE_ADMIN]}/>}>
                        <Route path={ADMIN_ROUTE} element={<Admin/>}></Route>
                    </Route>

                    <Route path={UNAUTHORIZED_ROUTE} element={<Unauthorized/>}></Route>

                    {/*error*/}
                    <Route path={"*"} element={<Missing/>}></Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
