import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
const Footer = () => {
  return (
    <div className="w-full h-full bg-black px-40">
      <div className=" grid grid-cols-8  py-10">
        <div className="flex flex-col gap-4 col-span-2 ">
          <h3 className="text-amber-50 text-2xl font-light mb-5">Account</h3>
          <h3 className="text-amber-50">Login</h3>
          <h3 className="text-amber-50">Sign up</h3>
        </div>

        <div className="flex flex-col gap-3 col-span-2">
          <div className="text-amber-50 text-2xl font-light mb-5">Company</div>
          <div className="text-amber-50">about as</div>
          <div className="text-amber-50">bulk orders</div>
        </div>

        <div className="flex flex-col gap-3 col-span-2">
          <div className="text-amber-50 text-2xl font-light mb-5 ">
            Get help
          </div>
          <div className="text-amber-50">Return and exchange policy</div>
          <div className="text-amber-50">Shipping policy</div>
          <div className="text-amber-50">Privacy Policy</div>
          <a className="text-amber-50">Terms and Conditions</a>
        </div>

        <div className="flex flex-col gap-3 ms-16 col-span-2">
          <h1 className="text-amber-50 text-2xl font-light mb-5">Connect</h1>
          <h3 className="text-amber-50">Instagram</h3>
          <h3 className="text-amber-50">contact us</h3>
        </div>
      </div>

      <h1 className="text-amber-50 text-2xl font-light text-center pb-4">
        Subscribe to our emails
      </h1>
      <div className="border border-amber-50 h-[40px] w-[320px] mt-3 text-center flex items-center mx-auto px-2 ">
        <input
          className="outline-none text-amber-50 placeholder:text-amber-50 font-light w-full" 
          type="text"
          placeholder="Email"
        />
        <MdKeyboardArrowRight className="text-white text-4xl"/>
      </div>

      <div className="mt-16 py-4 ">
        <p className="text-amber-50 text-sm font-extralight text-center">© 2025, EFFATHA</p>
      </div>
    </div>
  );
};

export default Footer;
