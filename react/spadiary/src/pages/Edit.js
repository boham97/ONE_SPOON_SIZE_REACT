import { useSearchParams } from "react-router-dom";

const Edit = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id")
    const mode = searchParams.get("mode")
    console.log(id, mode)
    return <div>
        <h2>edit</h2>
        <p>this is edit</p>
        <button onClick= {()=> setSearchParams({who: "kbs"})}> query change</button>


    </div>
}


export default Edit;