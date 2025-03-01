
import { useDispatch, useSelector } from 'react-redux';
import ChatbotIcon from "./ChatbotIcon"
import { setShowChatbot } from '../store/modules/button';


const ChatHeader = () => {
    const showChatbot = useSelector(state => state.btn.showChatbot)
    const dispatch = useDispatch()

    return (

        <div className="chat-header">
            <div className="chat-info">
                <ChatbotIcon />
                <h2 className="logo-text">
                    chatbot
                </h2>
            </div>
            <button className="material-symbols-outlined" onClick={() => dispatch(setShowChatbot(!showChatbot))}>
                keyboard_arrow_down
            </button>
        </div>
    )
}

export default ChatHeader