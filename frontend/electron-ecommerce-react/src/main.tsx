import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MessageScreenContextProvider} from "./context/MessageScreenContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
        <BrowserRouter>
            <AuthContextProvider>
                <MessageScreenContextProvider>
                    <Routes>
                        <Route path={"/*"} element={<App/>}></Route>
                    </Routes>
                </MessageScreenContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
)
