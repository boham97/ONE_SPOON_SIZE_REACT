import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyButton from "../component/MyButton";
import MyHeader from "../component/Myheader";

const Home = () => {
	const diaryList = useContext(DiaryStateContext)


	const [data,setData] = useState([])
	const [curDate, setCurDate]= useState(new Date())
	const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 ${curDate.getDate()}일`
  
	useEffect(()=>{
		const firstDay = new Date(
			curDate.getFullYear(),
			curDate.getMonth(),
			1
		).getTime()

		const lastDay = new Date(
			curDate.getFullYear(),
			curDate.getMonth() + 1,
			0
		).getTime()

		setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
	},[diaryList, curDate])

	useEffect(()=>{
		console.log(data)
	},[data])

	const increaseMonth = () => {
		setCurDate(
			new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
		)
	}
	
	const decreaseMonth = () => {
		setCurDate(
			new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
		)
	}


	return (
    <div>
    	<h2>Home</h2>
    	<p>this is home</p>    
			<MyHeader headText={headText}
				leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
				rightChild={<MyButton text={">"} onClick={increaseMonth} />}
			/>
    </div>
	)
}


export default Home;