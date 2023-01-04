import React, { useEffect, useState } from "react";

const TextView = React.memo(({text})=> {
    useEffect(() => {
        console.log(`update :: Text : ${text}`)
    })
    return <div>{text}</div>
})

const CountView = React.memo(({count})=> {
    useEffect(() => {
        console.log(`update :: Count : ${count}`)
    })
    return <div>{count}</div>
})

const CountViewB = ({obj})=> {
    useEffect(() => {
        console.log(`update :: CountB : ${obj.count}`)
    })
    //자바스크립트는 얕은 비교 객체의 주소가 다르면 다르다 => 계속 리렌더링됨!
    return <div>{obj.count}</div>
}

const areEqual = (prevprops, nextprops) => {
    return prevprops.obj.count === nextprops.obj.count
}

const MemoizedCounterB = React.memo(CountViewB, areEqual)

const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [text, setText] = useState("");
    const [obj, setObj] = useState({
        count: 1
    })

    return <div style={{ padding: 50 }}>
        <div>
            <h2>count</h2>
            <CountView count={count} />
            <button onClick={() => setCount(count)}>+</button>
        </div>
        <div>
            <h2>count b</h2>
            <MemoizedCounterB obj={obj}/>
            <button onClick={() => setObj({count: obj.count})}>+</button>
        </div>
        <div>
            <h2>text</h2>
            <TextView text={text} />
            <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    </div>
}

export default OptimizeTest