import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

import RouterLink from "./component/RouterLink";

//component
import MyButton from "./component/MyButton";
import MyHeader from "./component/Myheader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton 
              text={'왼쪽 버튼'}
              onClick={()=>alert('left')} />
          }
          rightChild={
            <MyButton 
              text={'오른쪽 버튼'}
              onClick={()=>alert('right')}/>
          }
        />
        <h2>App.js</h2>
        <MyButton
          text={'버튼'}
          onClick={() => alert('버튼클릭')}
          type={"positive"}
        />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/diary/:id" element={<Diary/>}/>
          <Route path="/edit" element={<Edit/>}/>
        </Routes>

        <RouterLink/>
      </div>
    </BrowserRouter>
  );
}

export default App;
