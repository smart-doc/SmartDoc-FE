import React from 'react';
import { CgAttachment } from "react-icons/cg";
import { FiMic } from "react-icons/fi";



const TextBox = () => {
  return (
    <div className='flex items-center border-1 border-[#ccc] rounded-md px-2 py-3 bg-[#fff]'>
        <button><CgAttachment className='cursor-pointer m-2' /></button>   
        <input type="text" placeholder="Tell us how you're feeling" className='border-none outline-none flex-1' />
        <button><FiMic className='cursor-pointer m-2' /></button>   
    </div>
  )
}

export default TextBox
