
import React, { useEffect, useRef, useState } from 'react'
import ChatbotIcon from './components/ChatbotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { setPause } from './store/modules/button';


const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
export default function App() {

  const [showChatbot,setShowChatbot]=useState(false)
  const [chatHistory,setChatHistory] =useState([])
  const chatBodyRef =useRef()
  const pause=useSelector(state=>state.btn.pause)
  const dispatch =useDispatch()

  const updateHistory=(text,isError=false)=>{
    setChatHistory(prev=>[...prev.filter(msg=>msg.text!=="Thinking..."),{role:"model",text,isError}])
  }

  useEffect(()=>{
      // 获取最后一条用户消息的ref
        chatBodyRef.current.scrollTo({
          top:chatBodyRef.current.scrollHeight,
          behavior: 'smooth',
        })

  },[chatHistory])

  const generateBotResponse=async (history)=>{
    history = history.map(({ role, text }) => ({
      role: role === "model" ? "assistant" : "user",
      content: text
    }));
    const requestOption = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-r1",
        messages:history
      }),
    };
    try {

      const response = await fetch(apiUrl, requestOption);//绑定AbortController信号
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

      const apiResponseText=data.choices[0].message.content.replace(/\*\*(.*?)\*\*/g,"$1").trim()
      console.log(apiResponseText)
      updateHistory(apiResponseText)
      dispatch(setPause(false))
      
    } catch (error) {
      updateHistory(error.message,true)
    }
  }

  return (
    <div className={`container ${showChatbot&&'show-chatbot'}`}>
      <button  id="chatbot-toogler" onClick={()=>setShowChatbot(prev=>!prev)}>
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot-popup">
        {/* chatbot Header */}
        <div className="chat-header">
          <div className="chat-info">
            <ChatbotIcon />
            <h2 className="logo-text">
              chatbot
            </h2>
          </div>
          <button className="material-symbols-outlined" onClick={()=>setShowChatbot(prev=>!prev)}>
              keyboard_arrow_down
            </button>
        </div>
        {/* chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">Hey,how can i help u</p>
          </div>

          {/*  动态渲染聊天记录 */}
            {chatHistory.map((chat,index)=>(
              <ChatMessage chat={chat} key={index} />
            ))}            
        </div>

        {/* chatbot Footer */}
        <div className="chat-footer">
          <ChatForm setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} chatHistory={chatHistory}/>
        </div>
      </div>
    </div>
  )
}
