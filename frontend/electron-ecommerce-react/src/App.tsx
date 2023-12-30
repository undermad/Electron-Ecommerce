import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppLayout} from "./ui/AppLayout.tsx";
import {Search} from "./ui/search/Search.tsx";
import {Basket} from "./ui/basket/Basket.tsx";
import {Home} from "./ui/home/Home.tsx";
import {Account} from "./ui/account/Account.tsx";

function App() {

    const router = createBrowserRouter([

        {
            element: <AppLayout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "/search",
                    element: <Search/>
                },
                {
                    path: "/basket",
                    element: <Basket/>
                },
                {
                    path: "/account",
                    element: <Account/>
                }
            ]
        }

    ])

    return (
        <RouterProvider router={router}/>
    )
}

export default App
