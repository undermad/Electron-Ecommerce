import {useViewport} from "../../custom_hooks/useViewport.ts";
import {Breakpoints} from "../../constants/Breakpoints.ts";
import {Hero} from "./Hero.tsx";
import {Link} from "react-router-dom";
import {ADMIN_ROUTE} from "../../constants/Routes.ts";
import {useRefreshToken} from "../../custom_hooks/useRefreshToken.ts";
import useAxiosPrivate from "../../api/privateAxios.ts";

export const Home = () => {

    const width = useViewport();
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();

    const test = () => {
        axiosPrivate.get("/test")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (

        <section className={"px-responsive-electron w-full max-w-[1440px] "}>
            <Link to={ADMIN_ROUTE}>Admin Section Click</Link>
            <br/>
            <button onClick={() => refresh()}>Refresh Token</button>
            <button onClick={() => test()}>Protected Route</button>




            {width >= Breakpoints.SMALL ?
                <Hero/>
                : ""}

        </section>
    )
}