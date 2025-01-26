import React,{useState} from 'react'
import { Navigate } from 'react-router-dom'

export default function Home() {
  const[sum,setSum]=useState(1);
  return (
    <div>
    <h1>Home</h1>
    {sum===1?<h2>sum值为{sum}</h2>:<Navigate to="/about" replace={true} />}
    <button onClick={()=>setSum(2)}>点我将sum变为2</button>
    </div>
  )
}
