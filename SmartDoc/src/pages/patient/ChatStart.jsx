import React from 'react'
import SubNav from '../../components/SubNav'
import TextBox from '../../components/TextBox'

const ChatStart = ({onNext}) => {
  return (
    <div className='px-6 flex flex-col justify-between h-screen pb-10 md:pb-16'>
      <SubNav />
      
      <TextBox />
    </div>
  )
}

export default ChatStart
