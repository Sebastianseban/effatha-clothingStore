

import React, { useEffect, useState } from 'react';
import AnimatedButton from '../AnimatedButton';

const slides = [
  {
    id: 1,
    image: '/hero5.jpg',
    content: (
      <>
        <p className="text-lg sm:text-xl md:text-2xl font-light text-center text-white">
          every day essentials
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          New Collection
        </h1>
        <AnimatedButton />
      </>
    ),
  },
  {
    id: 2,
    image: '/hero7.jpg',
    content: (
      <>
        <p className="text-lg sm:text-xl md:text-2xl font-light text-center text-white">
          every day essentials
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          New Collection
        </h1>
        <AnimatedButton />
      </>
    ),
  },
  {
    id: 3,
    image: '/hero1.jpg',
    content: (
      <>
        <p className="text-lg sm:text-xl md:text-2xl font-light text-center text-white">
          every day essentials
        </p>
        <h1 className="text-2xl sm:text-4xl font-bold text-white">
          New Collection
        </h1>
        <AnimatedButton />
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
    <div className="w-full h-[500px] sm:h-[600px] relative overflow-hidden">
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
          <div className="relative z-30 text-center px-4 flex flex-col items-center">
            {slide.content}

            {/* Dots */}
            <div className="flex gap-2 sm:gap-4 mt-20 sm:mt-32">
              {slides.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
                    current === dotIndex
                      ? 'border-dotted border-white animate-spin-slow'
                      : 'border-gray-400'
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

