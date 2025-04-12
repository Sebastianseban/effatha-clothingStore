// import React from 'react'

// const Section1 = () => {
//   return (
//     <div className="w-full h-full ">
//     <div className='w-full h-[600px] overflow-hidden relative flex justify-center items-center'>
//           <img className='object-cover absolute'  src="/hero5.jpg" alt="" />
//           <div className='z-40'>
//               <h1 className='text-4xl font-bold text-white'>Buy Now</h1>

//               <div className='flex gap-4 mt-40 justify-center items-center'>
// <div className='bg-gray-400 p-1 rounded-full'><div className='size-3 bg-gray-200 rounded-full'></div></div>
// <div className='size-3 bg-gray-100 rounded-full'></div>
// <div className='size-3 bg-gray-00 rounded-full'></div>
// <div className='size-3 bg-gray-200 rounded-full'></div>

//               </div>
//           </div>

//       </div>
//     <div className="w-full h-[600px] overflow-hidden relative flex justify-center items-center">
//       <img className="object-cover absolute   " src="/hero7.jpg" alt="" />
//       <div className="z-40 flex justify-center flex-col items-center">
//           <p className="text-2xl font-light text-center text-white">every day essentials</p>
//         <h1 className="text-4xl font-bold text-white">New Collection</h1>

//         <button className="text-2xl text-white border py-2 px-4 mt-9">Shop Now</button>

//         <div className="flex gap-4 mt-40 justify-center">
//           <div className="size-3 bg-gray-200 rounded-full"></div>
//           <div className="size-3 bg-gray-200 rounded-full"></div>
//           <div className="size-3 bg-gray-200 rounded-full"></div>
//           <div className="size-3 bg-gray-200 rounded-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Section1

import React, { useEffect, useState } from 'react';

const slides = [
  {
    id: 1,
    image: '/hero5.jpg',
    content: (
        <>
        <p className="text-2xl font-light text-center text-white">every day essentials</p>
        <h1 className="text-4xl font-bold text-white">New Collection</h1>
        <button className="text-2xl text-white border py-2 px-4 mt-9">Shop Now</button>
      </>
    ),
  },
  {
    id: 2,
    image: '/hero7.jpg',
    content: (
      <>
        <p className="text-2xl font-light text-center text-white">every day essentials</p>
        <h1 className="text-4xl font-bold text-white">New Collection</h1>
        <button className="text-2xl text-white border py-2 px-4 mt-9">Shop Now</button>
      </>
    ),
  },
  {
    id: 3,
    image: '/hero7.jpg',
    content: (
      <>
        <p className="text-2xl font-light text-center text-white">every day essentials</p>
        <h1 className="text-4xl font-bold text-white">New Collection</h1>
        <button className="text-2xl text-white border py-2 px-4 mt-9">Shop Now</button>
      </>
    ),
  },
  
];

const Section1 = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[600px] relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out flex justify-center items-center ${
            index === current ? 'opacity-100 z-20' : 'opacity-0 z-10'
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute w-full h-full object-cover"
          />
          <div className="relative z-30 text-center flex flex-col items-center">
            {slide.content}
            {/* Dots */}
            <div className="flex gap-4 mt-40">
              {slides.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`w-5 h-5 rounded-full border-2 ${
                    current === dotIndex ? 'border-dotted border-white animate-spin-slow' : 'border-gray-400'
                  } flex items-center justify-center`}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section1;
