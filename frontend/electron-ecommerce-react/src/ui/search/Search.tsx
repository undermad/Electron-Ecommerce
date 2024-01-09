import useAxiosPrivate from "../../custom_hooks/useAxiosPrivate.ts";

export const Search = () => {
    const axiosPrivate = useAxiosPrivate();


    const test = () => {
        axiosPrivate.get("/test/test")
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (

        <section>
            <button onClick={test}>Click protected route</button>
            <br/>
            Product search section
        </section>
    )
}