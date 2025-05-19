
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import InputField from "../components/InputField";
import { useLogin } from "../hooks/useLogin";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useLogin();

  // Normal email/password login
  const handleLogin = (e) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (response) => {
          const { user, accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          setUser(user);
          navigate("/");
        },
        onError: (err) => {
          console.error("Login failed", err);
        },
      }
    );
  };

  // Google OAuth login
  const responseGoogle = async (authResult) => {
    try {
      const code = authResult.code;
      const response = await axiosInstance.post("/users/google-auth", { code });
      const { user, accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
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
      <div className="md:w-1/2 flex p-4 sm:p-20 flex-col bg-black justify-center items-center gap-5">
        <h1 className="text-lg sm:text-2xl text-white font-extralight">
          Login to Your Account
        </h1>
        <p className="text-sm sm:text-xl text-center text-white font-light">
          Enter your credentials to access your account
        </p>

        {/* Google Login Button */}
        <div
          className="flex mt-5 py-2 px-7 rounded-2xl text-amber-50 border justify-center gap-2 border-gray-500 items-center cursor-pointer"
          onClick={googleLogin}
        >
          <FcGoogle />
          <button type="button">Login with Google</button>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-500 w-full relative mt-2">
          <span className="text-gray-400 bg-black px-2 text-xl absolute left-1/2 -translate-x-1/2 -top-4">
            or
          </span>
        </div>

        {/* Email/Password Login Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
          <InputField
            label="Email"
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="w-full relative">
            <InputField
              label="Password"
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            className="bg-white text-black w-full h-16 rounded-2xl mt-4 text-lg font-medium"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {isError && (
          <p className="text-red-500 text-sm mt-2">
            {error?.response?.data?.message || "Login failed"}
          </p>
        )}

        <p className="text-[12px] text-amber-100 font-light mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-bold underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

