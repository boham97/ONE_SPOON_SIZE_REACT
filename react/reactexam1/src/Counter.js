import React,{useState} from "react";
import OddEven from "./OddEven"
const Counter = ({num1}) => {
    
    const [count, setCount] = useState(num1);

    const onIncrease = () => {
        setCount (count + 1)
    }

    const onDecrease = () => {
        setCount (count - 1)
    }

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <OddEven count={count}/>
        </div>
    )
}

Counter.defaultProps = {
    num1: 0,
}

export default Counter;