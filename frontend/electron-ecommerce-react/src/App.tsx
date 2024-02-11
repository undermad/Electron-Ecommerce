import {Route, Routes} from "react-router-dom";
import {AppLayout} from "./ui/AppLayout.tsx";
import {Search} from "./ui/search/Search.tsx";
import {Basket} from "./ui/basket/Basket.tsx";
import {Home} from "./ui/home/Home.tsx";
import {Missing} from "./ui/global/Missing.tsx";
import {
    LOGIN_ROUTE,
    BASKET_ROUTE,
    HOME_ROUTE,
    SEARCH_ROUTE,
    ADMIN_ROUTE,
    UNAUTHORIZED_ROUTE,
    MESSAGE_SCREEN_ROUTE,
    ACCOUNT_ROUTE,
    LOGOUT_ROUTE,
    REGISTER_ROUTE,
    ACTIVATE,
    FORGOT_PASSWORD,
    CHANGE_FORGOTTEN_PASSWORD
} from "./constants/Routes.ts";
import {RequireAuth} from "./ui/RequireAuth.tsx";
import {ROLE_ADMIN, ROLE_USER} from "./constants/UserRoles.ts";
import {Admin} from "./ui/admin/Admin.tsx";
import {Unauthorized} from "./ui/global/Unauthorized.tsx";
import {PersistLogin} from "./ui/PersistLogin.tsx";
import {MessageScreen} from "./ui/global/MessageScreen.tsx";
import {MyAccount} from "./ui/account/MyAccount.tsx";
import {Logout} from "./ui/account/Logout.tsx";
import {ActivateAccount} from "./ui/account/ActivateAccount.tsx";
import {ForgotPassword} from "./ui/account/ForgotPassword.tsx";
import {ChangeForgottenPassword} from "./ui/account/ChangeForgottenPassword.tsx";
import {Login} from "./ui/account/Login.tsx";
import {Register} from "./ui/account/Register.tsx";
import {ProductView} from "./ui/product-view/ProductView.tsx";

function App() {

    return (
        <Routes>
            <Route path={HOME_ROUTE} element={<AppLayout/>}>
                <Route element={<PersistLogin/>}>

                    {/*public routes*/}
                    <Route path={HOME_ROUTE} element={<Home/>}/>
                    <Route path={SEARCH_ROUTE + "/:category"} element={<Search/>}/>
                    <Route path={SEARCH_ROUTE + "/:category" + "/:productId"} element={<ProductView/>}/>
                    <Route path={BASKET_ROUTE} element={<Basket/>}/>


                    <Route path={LOGIN_ROUTE} element={<Login/>}/>
                    <Route path={REGISTER_ROUTE} element={<Register/>}/>
                    <Route path={FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                    <Route path={CHANGE_FORGOTTEN_PASSWORD + "/:token"} element={<ChangeForgottenPassword/>}/>
                    <Route path={ACTIVATE + "/:token"} element={<ActivateAccount/>}/>


                    {/*user protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[ROLE_USER]}/>}>
                        <Route path={ACCOUNT_ROUTE} element={<MyAccount/>}/>
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
