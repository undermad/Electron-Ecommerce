import {LOGOUT_EVERYWHERE} from "../../constants/ApiEndpointsPaths.ts";
import {useAuth} from "../../custom_hooks/useAuth.ts";
import {axiosBearer} from "../../api/axios.ts";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../constants/Routes.ts";
import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";

const LogoutEverywhereButton = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const handleLogoutEverywhere = () => {
        auth?.setAuth({});
        const attachBearerToken = axiosBearer.interceptors.request.use(config => {
            config.headers['Authorization'] = `${auth?.auth?.tokenType} ` + `${auth?.auth?.token}`;
            return config;
        }, (error) => Promise.reject(error));

        axiosPrivate.post(LOGOUT_EVERYWHERE)
            .then((response) => {
                console.log(response.data);
                navigate(LOGIN_ROUTE)
            })
            .catch((error) => {
                console.log(error);
            })

        axiosBearer.interceptors.request.eject(attachBearerToken);
    }

    return (
        <button onClick={handleLogoutEverywhere}>Logout Eveywhere</button>
    )
}

export default LogoutEverywhereButton;