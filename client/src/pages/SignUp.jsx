
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import InputField from "../components/InputField";
import { useRegister } from "../hooks/useRegister";
import useUserStore from "../store/userStore";
import axiosInstance from "../api/axiosInstance";
import { useGoogleLogin } from "@react-oauth/google";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const { mutate: registerUser, isLoading } = useRegister();

  // Normal signup form handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobileNumber ||
      !formData.password
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    registerUser(formData, {
      onSuccess: (response) => {
        toast.success("Account created successfully!");
        setUser(response.user);
        navigate("/login");
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Registration failed!");
      },
    });
  };

  // Google OAuth signup/login callback
  const responseGoogle = async (authResult) => {
    try {
      const code = authResult.code;
      const response = await axiosInstance.post("/users/google-auth", { code });
      const { user, accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      setUser(user);
      toast.success("Signed up successfully with Google!");
      navigate("/");
    } catch (error) {
      console.error("Google signup failed", error);
      toast.error("Google signup failed.");
    }
  };

  // Google login hook, same flow as LoginPage
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google OAuth error", error);
      toast.error("Google authentication failed.");
    },
    flow: "auth-code",
  });

  return (
    <div className="w-full flex flex-col md:flex-row">
      {/* Left Side */}
      <div
        className="md:w-1/2 bg-cover bg-amber-200"
        style={{ backgroundImage: "url('/hero7.jpg')" }}
      ></div>

      {/* Right Side */}
      <div className="md:w-1/2 flex p-4 md:p-20 pt-10 pd:mt-0 flex-col bg-black justify-center items-center gap-5">
        <h1 className="text-lg sm:text-2xl text-white font-extralight">
          Sign Up Account
        </h1>
        <p className="text-sm sm:text-xl text-white font-light">
          Enter your personal data to create your account
        </p>

        {/* Google Sign up Button */}
        <div
          className="flex mt-5 py-2 px-7 rounded-2xl text-amber-50 border justify-center gap-2 border-gray-500 items-center cursor-pointer"
          onClick={() => googleLogin()}
        >
          <FcGoogle />
          <button type="button">Continue with Google</button>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-500 w-full relative mt-2">
          <span className="text-gray-400 bg-black px-2 text-xl absolute left-1/2 -translate-x-1/2 -top-4">
            or
          </span>
        </div>

        {/* Signup Form */}
        <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
          <div className="text-md: flex w-full gap-8">
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

          <InputField
            label="Email"
            id="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Mobile Number"
            id="mobileNumber"
            placeholder="Enter your number"
            type="tel"
            value={formData.mobileNumber}
            onChange={handleChange}
          />

          <div className="w-full relative">
            <InputField
              label="Password"
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[52px] right-4 text-gray-400 hover:text-white text-xl"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            <p className="text-[12px] text-amber-100 font-light mt-2">
              Must be at least 8 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black hover:bg-gray-200 cursor-pointer w-full py-2 rounded-2xl mt-4 text-lg font-medium"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-[12px] text-amber-100 font-light mt-2">
          Already have an account?{" "}
          <Link to="/login" className="font-bold cursor-pointer">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
