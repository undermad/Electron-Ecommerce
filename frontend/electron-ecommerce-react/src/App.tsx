import {Route, Routes} from "react-router-dom";
import {AppLayout} from "./ui/AppLayout.tsx";
import {Search} from "./ui/search/Search.tsx";
import {Basket} from "./ui/basket/Basket.tsx";
import {Home} from "./ui/home/Home.tsx";
import {Login} from "./ui/account/Login.tsx";
import {Missing} from "./ui/global/Missing.tsx";
import {LOGIN, BASKET, HOME, SEARCH} from "./constants/Routes.ts";
import {RequireAuth} from "./ui/account/RequireAuth.tsx";

function App() {


    return (
        <Routes>
            <Route path={HOME} element={<AppLayout/>}>
                {/*public routes*/}
                <Route path={HOME} element={<Home/>}></Route>
                <Route path={SEARCH} element={<Search/>}></Route>
                <Route path={LOGIN} element={<Login/>}></Route>

                {/*protected routes*/}
                <Route element={<RequireAuth/>}>
                    <Route path={BASKET} element={<Basket/>}></Route>
                </Route>


                {/*error*/}
                <Route path={"*"} element={<Missing/>}/>

            </Route>
        </Routes>
    )
}

export default App
