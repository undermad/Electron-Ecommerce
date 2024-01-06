import {Route, Routes} from "react-router-dom";
import {AppLayout} from "./ui/AppLayout.tsx";
import {Search} from "./ui/search/Search.tsx";
import {Basket} from "./ui/basket/Basket.tsx";
import {Home} from "./ui/home/Home.tsx";
import {Login} from "./ui/account/Login.tsx";
import {Missing} from "./ui/global/Missing.tsx";
import {LOGIN, BASKET, HOME, SEARCH, ADMIN, UNAUTHORIZED} from "./constants/Routes.ts";
import {RequireAuth} from "./ui/RequireAuth.tsx";
import {ROLE_ADMIN, ROLE_USER} from "./constants/UserRoles.ts";
import {Admin} from "./ui/admin/Admin.tsx";
import {Unauthorized} from "./ui/global/Unauthorized.tsx";

function App() {


    return (
        <Routes>
            <Route path={HOME} element={<AppLayout/>}>
                {/*public routes*/}
                <Route path={HOME} element={<Home/>}></Route>
                <Route path={SEARCH} element={<Search/>}></Route>
                <Route path={LOGIN} element={<Login/>}></Route>

                {/*protected routes*/}
                <Route element={<RequireAuth allowedRoles={[ROLE_USER]}/>}>
                    <Route path={BASKET} element={<Basket/>}></Route>
                </Route>

                {/*admin protected routes*/}
                <Route element={<RequireAuth allowedRoles={[ROLE_ADMIN]}/>}>
                    <Route path={ADMIN} element={<Admin/>}></Route>
                </Route>

                <Route path={UNAUTHORIZED} element={<Unauthorized/>}></Route>

                {/*error*/}
                <Route path={"*"} element={<Missing/>}></Route>

            </Route>
        </Routes>
    )
}

export default App
