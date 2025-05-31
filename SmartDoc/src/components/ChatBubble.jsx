import React from 'react'

const ChatBubble = ({ message, sender }) => {
    const isUser = sender === 'user';

  return (
    <div>
        <div style={{ fontFamily: 'PP Neue Montreal' }} className={`my-2 px-4 py-2 text-sm rounded-sm w-fit max-w-xs ${isUser ? 'bg-[#FBFBFB] ml-auto' : 'bg-white mr-auto'}`}>{message}</div>
    </div>
  )
}

export default ChatBubble
