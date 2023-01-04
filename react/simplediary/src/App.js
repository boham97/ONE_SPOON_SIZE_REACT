import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import './App.css';


function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0)

  const getData = async() => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json())
      
    const initData = res.slice(0,20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random()*5)+1,
        created_date: new Date().getTime(),
        id : dataId.current ++,
      }
    })
    setData(initData)
  }


  useEffect(()=> {
    getData()
  },[])

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1
    setData((data)=>[newItem, ...data])
  },[])

  const onEdit = (targetId, newContent) => {
    setData(data.map((it)=> 
      it.id === targetId ? {...it, content: newContent} : it
      )
    )
  }



  const  onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId)
    setData(newDiaryList)
  }

  // useMemo 메모이제이션 
  const getDiaryAnalysis = useMemo(() =>{
    const goodCount = data.filter((it)=> it.emotion >= 3).length
    const goodRatio = (goodCount / data.length) * 100
    return {goodCount, goodRatio}
  }, [data.length] // 값이 바뀌면 리렌더링ㄲㄲ
  )
  const {goodCount, goodRatio} = getDiaryAnalysis

  return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate}/>
      <div>{goodCount} / {data.length}: {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
