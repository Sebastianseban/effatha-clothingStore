import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard'
import { FaAngleLeft } from "react-icons/fa";

const Section2 = () => {
  return (
    <div className='w-full  px-16 py-3 relative '>
        <div className='flex justify-between mt-5'>
            <h1 className='text-2xl text-black font-medium'>NEW ARRIVALS</h1>
            <Link ><h2 className='text-[20px] text-black font-light underline  '>VIEW ALL</h2></Link>
        </div>

      <FaAngleLeft className='absolute top-1/6'/>

        <div className='mt-6 flex justify-center gap-6 overflow-x-auto pb-2 '>
            
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
           
        </div>
    </div>
  )
}

export default Section2