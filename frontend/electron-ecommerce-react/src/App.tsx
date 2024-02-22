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
    CHANGE_FORGOTTEN_PASSWORD,
    CHECKOUT_ROUTE,
    PAYMENT_INFORMATION_NESTED_ROUTE,
    ADDRESSES_NESTED_ROUTE,
    CHANGE_PASSWORD_NESTED_ROUTE,
    ADD_ADDRESS_NESTED_ROUTE,
    UPDATE_ADDRESS_NESTED_ROUTE,
    DELETE_ADDRESS_NESTED_ROUTE,
    CHECKOUT_ADDRESS_PICKER, CHECKOUT_ORDER_INFO
} from "./constants/Routes.ts";
import {RequireAuth} from "./ui/RequireAuth.tsx";
import {ROLE_ADMIN, ROLE_USER} from "./constants/UserRoles.ts";
import {Admin} from "./ui/admin/Admin.tsx";
import {Unauthorized} from "./ui/global/Unauthorized.tsx";
import {PersistLogin} from "./ui/PersistLogin.tsx";
import {MessageScreen} from "./ui/global/MessageScreen.tsx";
import {MyAccount} from "./ui/account/MyAccount.tsx";
import {Logout} from "./ui/auth/Logout.tsx";
import {ActivateAccount} from "./ui/auth/ActivateAccount.tsx";
import {ForgotPassword} from "./ui/auth/ForgotPassword.tsx";
import {ChangeForgottenPassword} from "./ui/auth/ChangeForgottenPassword.tsx";
import {Login} from "./ui/auth/Login.tsx";
import {Register} from "./ui/auth/Register.tsx";
import {ProductView} from "./ui/product-view/ProductView.tsx";
import {Checkout} from "./ui/basket/Checkout.tsx";
import {PaymentInformation} from "./ui/account/PaymentInformation.tsx";
import {AccountAddresses} from "./ui/account/AccountAddresses.tsx";
import {ChangePassword} from "./ui/account/ChangePassword.tsx";
import {AddAddressForm} from "./ui/account/AddAddressForm.tsx";
import {UpdateAddressForm} from "./ui/account/UpdateAddressForm.tsx";
import {DeleteAddress} from "./ui/account/DeleteAddress.tsx";
import React from "react";
import {AddressPicker} from "./ui/basket/AddressPicker.tsx";
import {OrderInformation} from "./ui/basket/OrderInformation.tsx";

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
                    <Route path={CHECKOUT_ROUTE} element={<Checkout/>}>
                        <Route path={CHECKOUT_ORDER_INFO} element={<OrderInformation/>}/>
                        <Route path={CHECKOUT_ADDRESS_PICKER} element={<AddressPicker/>}/>

                    </Route>


                    <Route path={LOGIN_ROUTE} element={<Login/>}/>
                    <Route path={REGISTER_ROUTE} element={<Register/>}/>
                    <Route path={FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                    <Route path={CHANGE_FORGOTTEN_PASSWORD + "/:token"} element={<ChangeForgottenPassword/>}/>
                    <Route path={ACTIVATE + "/:token"} element={<ActivateAccount/>}/>


                    {/*user protected routes*/}
                    <Route element={<RequireAuth allowedRoles={[ROLE_USER]}/>}>
                        <Route path={ACCOUNT_ROUTE} element={<MyAccount/>}>
                            <Route path={ADDRESSES_NESTED_ROUTE} element={<AccountAddresses/>}/>
                            <Route path={PAYMENT_INFORMATION_NESTED_ROUTE} element={<PaymentInformation/>}/>
                            <Route path={CHANGE_PASSWORD_NESTED_ROUTE} element={<ChangePassword/>}/>
                            <Route path={ADD_ADDRESS_NESTED_ROUTE} element={<AddAddressForm/>}/>
                            <Route path={UPDATE_ADDRESS_NESTED_ROUTE + "/:addressId"} element={<UpdateAddressForm />}/>
                            <Route path={DELETE_ADDRESS_NESTED_ROUTE + "/:addressId"} element={<DeleteAddress/>}/>
                        </Route>





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
