import React from 'react'
import SubNav from "../../components/SubNav";
import ChatBubble from '../../components/ChatBubble';
import TextBox from '../../components/TextBox';
import SmarySnt from '../../components/SmarySnt';


const SummarySent = () => {
  return (
    <div className='px-6 flex flex-col justify-between h-screen pb-10 md:pb-16' style={{fontFamily: 'PP Neue Montreal'}}>
          <SubNav />
    
          <div className='py-3 overflow-y-scroll'>
            <ChatBubble message="Thanks for sharing that. I’ll ask a few more questions to better understand how you’re feeling. When did you first notice these symptoms?" sender="doctor" />
    
            <ChatBubble message="It started yesterday morning" sender="user" />
    
            <ChatBubble message="Is the headache constant, or does it come and go?" sender="doctor" />
    
            <ChatBubble message="It comes and goes, but it’s always there" sender="user" />

            <ChatBubble message="Are you feeling chills or sweating?" sender="doctor" />
    
            <ChatBubble message="Yes, I’ve been sweating a lot lately" sender="user" />

            <ChatBubble message="Okay, thank you for your response. I’ll generate a summary and send it across to the doctor for a review. You’ll get a response soon" sender="doctor" />    
          </div>

          <div className='flex flex-col gap-4'>
            <SmarySnt />
            <TextBox />
          </div>
        </div>
  )
}

export default SummarySent
