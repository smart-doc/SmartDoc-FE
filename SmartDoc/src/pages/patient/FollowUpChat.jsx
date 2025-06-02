import React from 'react'
import SubNav from "../../components/SubNav";
import ChatBubble from '../../components/ChatBubble';
import TextBox from '../../components/TextBox';

const FollowUpChat = () => {
  const messages = [
    { sender: "user", text: "I’ve not been feeling well since yesterday. I have a headache, body pains, I feel feverish. I vomited once this morning after eating and haven’t had much appetite. No cough or catarrh. I feel weak and tired." },
    { sender: "doctor", text: "Thanks for sharing that. I’ll ask a few more questions to better understand how you’re feeling. When did you first notice these symptoms?" },
    { sender: "user", text: "It started yesterday morning" },
    { sender: "doctor", text: "Is the headache constant, or does it come and go?" },
    { sender: "user", text: "It comes and goes, but it’s always there" },
    { sender: "doctor", text: "Are you feeling chills or sweating?" },
  ];

  return (
    <div className='px-6 flex flex-col justify-between h-screen pb-10 md:pb-16' style={{fontFamily: 'PP Neue Montreal'}}>
      <SubNav />

      <div className='py-3 overflow-y-scroll'>
        {messages.map((msg, id) => (
          <ChatBubble key={id} message={msg.text} sender={msg.sender} />
        ))}
      </div>
      <TextBox />
    </div>
  )
}

export default FollowUpChat
