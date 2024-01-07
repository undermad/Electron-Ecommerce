import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthContextProvider} from "./api/context/AuthContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path={"/*"} element={<App/>}></Route>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
