import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import React, { useRef, useReducer } from "react";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

import RouterLink from "./component/RouterLink";

//component
import MyButton from "./component/MyButton";
import MyHeader from "./component/Myheader";

const reducer = (state, action) => {
  let newState = []
  switch(action.type){
    case 'INIT':{
      return action.data
    }
    case 'CREATE':{
      const newItem = {
        ...action.data
      }
      newState = [newItem, ...state]
      break
    }
    case 'REMOVE': {
      newState = state.filter((it)=>it.id !== action.targetId)
    }
    case 'EDIT': {
      newState = state.map((it)=> it.id === action.data.id ? {...action.data} : it)
      break
    }
    default:
      return state
  }
  return newState
}

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "1번 일기",
    date: 1674651675117
  },
  {
    id: 2,
    emotion: 2,
    content: "2번 일기",
    date: 1674651675118
  },
  {
    id: 3,
    emotion: 3,
    content: "3번 일기",
    date: 1674651675119
  },
  {
    id: 4,
    emotion: 4,
    content: "1번 일기",
    date: 1674651675120
  },
  {
    id: 5,
    emotion: 5,
    content: "2번 일기",
    date: 1674651675121
  },

]

function App() {
  
  const [data, dispatch] = useReducer(reducer, dummyData)

  const dataId = useRef(0)
  //create
  const onCreate = (date,content,emotion)=>{
    dispatch({
      type: "CREATE", 
      data:{
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
    dataId.current += 1
  }
  //remove
  const onRemove = (targetId)=>{
    dispatch({type:"REMOVE", targetId})
  }
  //edit
  const onEdit = (targetId,date, content, emotion)=>{
    dispatch({
      type:"EDIT",
      data:{
        id:targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }



  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate, onRemove, onEdit
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/new" element={<New/>}/>
              <Route path="/diary/:id" element={<Diary/>}/>
              <Route path="/edit" element={<Edit/>}/>
            </Routes>
            <RouterLink/>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
