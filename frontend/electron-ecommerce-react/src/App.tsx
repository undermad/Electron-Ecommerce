import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppLayout} from "./ui/AppLayout.tsx";

function App() {

    const router = createBrowserRouter([

        {
            element: <AppLayout/>,
            children: [
                {
                    path: "/",
                    element: <div>Hello</div>
                },
            ]
        }

    ])

    return (
        <RouterProvider router={router}/>
    )
}

export default App
