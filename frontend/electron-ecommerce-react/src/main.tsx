import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MessageScreenContextProvider} from "./context/MessageScreenContext.tsx";
import {ProductContextProvider} from "./context/ProductContext.tsx";
import {ThemeContextProvider} from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <MessageScreenContextProvider>
                    <ThemeContextProvider>

                        <ProductContextProvider>
                            <Routes>
                                <Route path={"/*"} element={<App/>}></Route>
                            </Routes>
                        </ProductContextProvider>
                    </ThemeContextProvider>
                </MessageScreenContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
)
