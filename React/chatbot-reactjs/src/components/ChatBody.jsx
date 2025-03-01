import { useEffect,useRef } from "react"
import ChatbotIcon from "./ChatbotIcon"
import ChatMessage from "./ChatMessage"
import { upSertMessageAPI } from "../apis/chatbot"

const ChatBody=({chatHistory})=>{
    const chatBodyRef =useRef()
  useEffect(()=>{
    console.log(chatHistory)
          const upSertMessage=async()=>{
            try {
              const message_index=Number(chatHistory.indexOf(chatHistory.at(-1)))
              
              const {role,text} =chatHistory.at(-1)
              const res =await upSertMessageAPI({
                message_index,
                role,
                text
              })
            } catch (error) {
              
            }

          }
       upSertMessage()
      // 获取最后一条用户消息的ref
        chatBodyRef.current.scrollTo({
          top:chatBodyRef.current.scrollHeight,
          behavior: 'smooth',
        })

  },[chatHistory])

    return(
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
    )
}

export default ChatBody