import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPause } from '../store/modules/button'

export default function ChatForm({setChatHistory,generateBotResponse,chatHistory}) {
    const pause=useSelector(state=>state.btn.pause)
    const dispatch=useDispatch()
    const inputRef =useRef()
    const handleFormSubmit= (e)=>{
      e.preventDefault()
        dispatch(setPause(true))
        const userMessage = inputRef.current.value.trim()
        if(!userMessage) {return}
        inputRef.current.value=""

        //更新用户信息的聊天记录
        setChatHistory((history)=>[...history,{role:"user",text:userMessage}])
        
        //用Thinking...先代替机器人的回复
        setTimeout( ()=>{
        setChatHistory((history)=>[...history,{role:"model",text:"Thinking..."}])
        
        generateBotResponse([...chatHistory,{role:"user",text:userMessage}])
        
        },600)
    
  }
  return (
    <form action="#" className='chat-form' onSubmit={handleFormSubmit}>
    <input ref={inputRef} type="text"placeholder='message...'
     className="message-input" required />
     <button className={`material-symbols-outlined ${pause?'pause':''}`}>
      {pause?'crop_square':'arrow_upward'}
    </button>
  </form>
  )
}
