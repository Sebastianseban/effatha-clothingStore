import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

const CollectionCard = () => {
  return (
    <div className="bg-gray-50 flex justify-center flex-col  shadow-md overflow-hidden w-[400px] ">
          <img src="/card2.png" className="w-[300px] h-[300px]  object-cover" />
    
          <div className="p-4 bg-white flex justify-between">
           <h1 className='text-black font-medium' >T Shirts</h1>
           <FaArrowRight/>
           
          </div>
        </div>
  )
}

export default CollectionCard