import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Fa1, FaBold, FaPlus } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { PiHandCoins } from "react-icons/pi";

const ProductPage = () => {
  return (
    // left section
    <div className="w-full  flex mt-5 px-8">
      <div className="w-3/5 grid grid-cols-2 gap-3 ">
        <div className="bg-gray-200">
          <img src="tshirt.png" alt="" />
        </div>
        <div className="bg-gray-200">
          <img src="tshirt.png" alt="" />
        </div>
        <div className="bg-gray-200">
          <img src="tshirt.png" alt="" />
        </div>
        <div className="bg-gray-200">
          <img src="tshirt.png" alt="" />
        </div>
      </div>

      {/* right section */}

      <div className="w-2/5 px-10">
        <div>
          <div className="flex  justify-between">
            <p className="text-xl text-gray-900 font-light tracking-widest">
              Represent
            </p>
            <MdFavoriteBorder className="text-2xl" />
          </div>

          <h1 className="text-3xl text-black mt-2">
            QUESTION YOUR INNOCENCE <br />
            T-SHIRT
          </h1>
          <p className="text-gray-500 text-sm">VINTAGE BLACK</p>
          <h1 className="text-black text-2xl font-medium">₹11,999</h1>

          <p className="text-gray-500 text-xl mt-4">Apparel Size</p>

          <div className="flex gap-2 mt-2">
            <div className="border border-gray-400 px-5 text-black py-1 text-center">
              <p>S</p>
            </div>
            <div className="border border-gray-400 px-5 py-1 text-center">
              <p>M</p>
            </div>
            <div className="border border-gray-400 px-5 py-1 text-center">
              <p>L</p>
            </div>
            <div className="border border-gray-400 px-5 py-1 text-center">
              <p>XL</p>
            </div>
            <div className="border border-gray-400 px-5 py-1 text-center">
              <p>2Xl</p>
            </div>
          </div>
          <div className="my-5 ">
            <button className="bg-black text-white w-full py-5">
              Add to cart
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
              <p>ABOUT PRODUCT</p>
              <FaPlus />
            </div>
            <div className="flex justify-between items-center border-b border-gray-400 pb-4 mt-4">
              <p>ABOUT PRODUCT</p>
              <FaPlus />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
              <p>ABOUT PRODUCT</p>
              <FaPlus />
            </div>
            <div className="flex justify-between items-center border-b border-gray-400 pb-4 mt-4">
              <p>ABOUT PRODUCT</p>
              <FaPlus />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center border-b border-gray-400 mt-6 pb-4 px-8">
              <div className="flex flex-col items-center">
                <FaShippingFast className="text-4xl" />

                <p className="text-sm">Free shipping</p>
              </div>
              <div className="flex flex-col items-center">
                <TfiReload className="text-4xl" />

                <p className="text-sm">No return</p>
              </div>

              <div className="flex flex-col items-center">
                <PiHandCoins className="text-4xl" />

                <p className="text-sm">COD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
