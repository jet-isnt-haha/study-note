import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPause } from '../store/modules/button'

const ChatFooter = ({ setChatHistory, generateBotResponse, chatHistory }) => {

    const pause = useSelector(state => state.btn.pause)
    const dispatch = useDispatch()
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.disabled = !inputRef.current.disabled
        inputRef.current.required = !inputRef.current.required
    }, [pause])
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const userMessage = inputRef.current.value.trim()
        if (!pause) {
            if (!userMessage) { return }
            dispatch(setPause(true))
            inputRef.current.value = ""
            setChatHistory((history) => [...history, { role: "user", text: userMessage }])
        }
        //更新用户信息的聊天记录

        //用Thinking...先代替机器人的回复
        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }])

            generateBotResponse(userMessage ? [...chatHistory, { role: "user", text: userMessage }] : chatHistory)

        }, 600)

    }
    return (
        <div className="chat-footer">
            <form action="#" className='chat-form' onSubmit={handleFormSubmit}>
                <input ref={inputRef} type="text" placeholder='message...'
                    className="message-input" disabled />
                <button className={`material-symbols-outlined ${pause ? 'pause' : ''}`}>
                    {pause ? 'crop_square' : 'arrow_upward'}
                </button>
            </form>
        </div>
    )

}


export default ChatFooter