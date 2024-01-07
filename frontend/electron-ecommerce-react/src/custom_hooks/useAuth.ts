import {useContext} from "react";
import {AuthContext} from "../api/context/AuthContext.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
}
