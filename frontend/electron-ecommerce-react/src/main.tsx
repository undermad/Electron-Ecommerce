import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MessageScreenContextProvider} from "./context/MessageScreenContext.tsx";
import {ProductContextProvider} from "./context/ProductContext.tsx";
import {ThemeContextProvider} from "./context/ThemeContext.tsx";
import {BasketContextProvider} from "./context/BasketContext.tsx";
import {disableReactDevTools} from '@fvilers/disable-react-devtools';
import {ErrorNotificationContextProvider} from "./context/ErrorNotificationContext.tsx";


disableReactDevTools();


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
            <ErrorNotificationContextProvider>
                <AuthContextProvider>
                    <BasketContextProvider>
                        <MessageScreenContextProvider>
                            <ThemeContextProvider>
                                <ProductContextProvider>
                                    <Routes>
                                        <Route path={"/*"} element={<App/>}></Route>
                                    </Routes>
                                </ProductContextProvider>
                            </ThemeContextProvider>
                        </MessageScreenContextProvider>
                    </BasketContextProvider>
                </AuthContextProvider>
            </ErrorNotificationContextProvider>
    </BrowserRouter>
)
