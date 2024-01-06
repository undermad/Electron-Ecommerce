import {useContext} from "react";
import {AuthContext} from "../ui/context/AuthContext.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
}
