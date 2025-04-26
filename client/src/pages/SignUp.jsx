import React from "react";
import { FcGoogle } from "react-icons/fc";
import InputField from "../components/InputField";


const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 h-full bg-cover bg-amber-200"   style={{
          backgroundImage: "url('/hero7.jpg')", // 👈 Make sure image is in public/
        }}></div>

      {/* Right Side */}
      <div className="w-1/2 flex p-20 flex-col bg-black justify-center items-center gap-5">
        <h1 className="text-2xl text-white font-extralight">Sign Up Account</h1>
        <p className="text-xl text-white font-light">
          Enter your personal data to create your account
        </p>

        {/* Google Button */}
        <div className="flex mt-5 py-2 px-7 rounded-2xl text-amber-50 border justify-center gap-2 border-gray-500 items-center  cursor-pointer">
          <FcGoogle />
          <button>Google</button>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-500 w-full relative mt-2">
          <span className="text-gray-400 bg-black px-2 text-xl absolute left-1/2 -translate-x-1/2 -top-4">
            or
          </span>
        </div>

        {/* Form Inputs */}
        <div className="flex w-full justify-between gap-8">
          <InputField
            label="First Name"
            id="firstName"
            placeholder="Enter your first name"
          />
          <InputField
            label="Last Name"
            id="lastName"
            placeholder="Enter your last name"
          />
        </div>

        <InputField
          label="Email"
          id="email"
          placeholder="Enter your email"
          type="email"
        />

        <div className="w-full">
          <InputField
            label="Password"
            id="password"
            placeholder="Enter your password"
            type="password"
          />
          <p className="text-[12px] text-amber-100 font-light mt-2">
            Must be at least 8 characters.
          </p>
        </div>

        {/* Sign Up Button */}
        <button className="bg-white text-black w-full py-2 rounded-2xl mt-4 text-lg font-medium">
          Sign Up
        </button>

        <p className="text-[12px] text-amber-100 font-light mt-2">Alredy have a account?<span className="font-bold">Log in</span></p>
      </div>
    </div>
  );
};

export default SignUpPage;
