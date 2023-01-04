import React, { useEffect, useState} from "react";

const TextView = ({text}) => {
    return <div>{text}</div>
}

const CountView = ({count}) => {
    return <div>{count}</div>
}

const LifeCycle = () => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState("")
/* 
    useEffect(()=> {
        console.log("Mounted!")
    },[])

    useEffect(()=> {
        console.log("Update!")
    },[count])

 */
    return (
        <div>
            <div>
                <CountView count={count}/>
                <button onClick={()=>setCount(count + 1)}>+</button>
                <button onClick={()=>setCount(count - 1)}>-</button>
            </div>
            <div>
                <TextView text={text}/>
                <input value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
        </div>
    )
 }

export default LifeCycle;