import React from 'react'
  
  const AnimatedButton = () => {
    return (
      <button className="relative overflow-hidden text-2xl text-white border border-white py-2 px-6 mt-9 group">
      <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></span>
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">Shop Now</span>
    </button>
    )
  }
  
  export default AnimatedButton