import React from 'react'
import { LuAlignJustify } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";


const NavBar = () => {
  return (
    <div className='w-full  border-b border-gray-300  flex justify-between items-center px-16 py-3 '>
        <div className='flex gap-6 items-center text-2xl'>
        <LuAlignJustify />
        <IoIosSearch/>

        </div>

        <div className='flex flex-col justify-center items-center  '>
           <h1 className='text-3xl font-semibold'>EFFATHA</h1>
           <p className='text-sm font-light '>LET IT BE OPENED</p>

        </div>

        <div className='flex gap-6 items-center text-2xl'>
           <FaRegUser/>
           <BsCart3/>


        </div>
    </div>
  )
}

export default NavBar