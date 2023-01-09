import { Link, useNavigate } from "react-router-dom"

const RouterLink = () => {

    const navi = useNavigate()

    return (
        <>
            <Link to={"/"}>home</Link>
            <span>|</span>
            <Link to={"/new"}>new</Link>
            <span>|</span>
            <Link to={"/diary"}>diary</Link>
            <span>|</span>
            <Link to={"/edit"}>edit</Link>
            <br/>
            <button onClick={()=>navi("/")}>home</button>
        </>
    )
}

export default RouterLink