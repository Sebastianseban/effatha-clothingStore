import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import InputField from "../components/InputField";
import { useRegister } from "../hooks/useRegister";
import useUserStore from "../store/userStore";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const { mutate: registerUser, isLoading } = useRegister();

  const setUser = useUserStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(formData, {
      onSuccess: (data) => {
        toast.success("Account created successfully!");
        setUser(data.user);
        console.log(data.user);
        //redirect
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Registration failed!");
      },
    });
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left Side with Background Image */}
      <div
        className="w-1/2 h-full bg-cover bg-amber-200"
        style={{
          backgroundImage: "url('/hero7.jpg')", // Background image from public folder
        }}
      ></div>

      {/* Right Side - Form section */}
      <div className="w-1/2 flex p-20 flex-col bg-black justify-center items-center gap-5">
        {/* Heading */}
        <h1 className="text-2xl text-white font-extralight">Sign Up Account</h1>
        <p className="text-xl text-white font-light">
          Enter your personal data to create your account
        </p>

        {/* Google Sign up button (not connected yet) */}
        <div className="flex mt-5 py-2 px-7 rounded-2xl text-amber-50 border justify-center gap-2 border-gray-500 items-center cursor-pointer">
          <FcGoogle />
          <button>Google</button>
        </div>

        {/* Divider Line */}
        <div className="border-b border-gray-500 w-full relative mt-2">
          <span className="text-gray-400 bg-black px-2 text-xl absolute left-1/2 -translate-x-1/2 -top-4">
            or
          </span>
        </div>

        {/* Form Start */}
        <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
          {/* Name Inputs Row */}
          <div className="flex w-full justify-between gap-8">
            <InputField
              label="First Name"
              id="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              id="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <InputField
            label="Email"
            id="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Mobile Number Input */}
          <InputField
            label="Mobile Number"
            id="mobileNumber"
            placeholder="Enter your number"
            type="text"
            value={formData.mobileNumber}
            onChange={handleChange}
          />

          {/* Password Input */}
          <div className="w-full">
            <InputField
              label="Password"
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Password Hint */}
            <p className="text-[12px] text-amber-100 font-light mt-2">
              Must be at least 8 characters.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className="bg-white text-black w-full py-2 rounded-2xl mt-4 text-lg font-medium"
          >
            {/* Change text based on loading state */}
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Already have account */}
        <p className="text-[12px] text-amber-100 font-light mt-2">
          Already have an account?
          <span className="font-bold cursor-pointer"> Log in</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
