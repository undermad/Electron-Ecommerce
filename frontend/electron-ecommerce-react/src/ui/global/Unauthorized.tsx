import {useNavigate} from "react-router-dom";

export const Unauthorized = () => {

    const navigation = useNavigate();

    const goBack = () => navigation(-1);

    return (
        <section>
            <div>
                <h1>Unauthorized.</h1>
                <p>You do not have access to request that page.</p>
                <p>Pleas go <button onClick={goBack}>back</button></p>
            </div>
        </section>
    )
}