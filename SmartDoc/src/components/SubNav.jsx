import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";

const SubNav = () => {
  return (
    <div className='flex items-center justify-between py-6 font-bold' style={{ fontFamily: 'PP Neue Montreal' }}>
        <BiMenuAltLeft className='block text-2xl' /> 

        <div className='flex gap-2 items-center w-fit'>
            <p>New chat</p>
            <IoIosArrowDown className='block' />
        </div>
        <div className=''></div>
    </div>
  )
}

export default SubNav
