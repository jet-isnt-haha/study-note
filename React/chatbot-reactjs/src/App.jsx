
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPause } from './store/modules/button';
import { checkTokenAPI } from './apis/user';
import { generateAPI } from './apis/chatbot';
import { message } from 'antd';
import ChatLogout from './components/ChatLogout';
import ChatHeader from './components/ChatHeader';
import ChatBody from './components/ChatBody';
import ChatFooter from './components/ChatFooter';
import ChatbotToogler from './components/ChatbotToogler';

export default function App() {
 const [chatHistory,setChatHistory]=useState([])
 const showChatbot=useSelector(state=>state.btn.showChatbot)
  const pause=useSelector(state=>state.btn.pause)
  const dispatch =useDispatch()
  //使用useRef 来保存controller，因为useRef创建的对象在组件的整个生命周期内保持不变，不会因为组件重新渲染而重置
  const controllerRef = useRef(null);

  
  const updateHistory=(text,isError=false)=>{
    setChatHistory(prev=>[...prev.filter(msg=>msg.text!=="Thinking..."),{role:"model",text,isError}])
  }

  //渲染页面时（重新加载页面）时验证token
  useEffect(()=>{
    async function checkToken(){
    try {
      const res= await checkTokenAPI()
      if(res.data.code==='0000'){
        console.log(res.data.msg)
        message.success('欢迎您'+res.data.data.username)
      }
    } catch (error) {
      if(error.response){
        message.error(error.response.data.msg)
      }
    }
  }
  checkToken()

  },[])

  const generateBotResponse=async (history)=>{
    history = history.map(({ role, text }) => ({
      role: role === "model" ? "assistant" : "user",
      content: text
    }));

    const controller = controllerRef.current;
    if(pause){
      if (controller) {
        controller.abort();
    }
      dispatch(setPause(false))
    }else{
    try {
      controllerRef.current = new AbortController();
      const { signal } = controllerRef.current;
      const response =(await generateAPI(history,signal)).data


      const apiResponseText=response.data.choices[0].message.content.replace(/\*\*(.*?)\*\*/g,"$1").trim()

      updateHistory(apiResponseText)
      dispatch(setPause(false))
      
    } catch (error) {
      if(error.name==="CanceledError"){
        updateHistory('已取消请求',true)
      }else{
      updateHistory(error.message,true)
      dispatch(setPause(false))
      }
    }    
  }
}


  return (
    <div className={`container ${showChatbot&&'show-chatbot'}`}>
      <ChatLogout/>
      <ChatbotToogler/>
      <div className="chatbot-popup">
        {/* chatbot Header */}
       <ChatHeader/>
        {/* chatbot Body */}
        <ChatBody chatHistory={chatHistory}/>
        {/* chatbot Footer */}
        <ChatFooter setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} chatHistory={chatHistory}/>
      </div>
    </div>
  )
}
