// import React from "react";
// import { FcGoogle } from "react-icons/fc";
// import InputField from "../components/InputField";

// const LoginPage = () => {
//   return (
//     <div className="w-full h-screen flex">
//       {/* Left Side */}
//       <div className="w-1/2 h-full bg-cover bg-amber-200" style={{
//           backgroundImage: "url('/hero7.jpg')",
//         }}></div>

//       {/* Right Side */}
//       <div className="w-1/2 flex p-20 flex-col bg-black justify-center items-center gap-5">
//         <h1 className="text-2xl text-white font-extralight">Login to Your Account</h1>
//         <p className="text-xl text-white font-light">
//           Enter your credentials to access your account
//         </p>

//         {/* Google Button */}
//         <div className="flex mt-5 rounded-2xl text-amber-50 border justify-center gap-2 border-gray-500 items-center w-[400px] h-[50px] cursor-pointer">
//           <FcGoogle />
//           <button>Google</button>
//         </div>

//         {/* Divider */}
//         <div className="border-b border-gray-500 w-full relative mt-2">
//           <span className="text-gray-400 bg-black px-2 text-xl absolute left-1/2 -translate-x-1/2 -top-4">
//             or
//           </span>
//         </div>

//         {/* Form Inputs */}
//         <InputField
//           label="Email"
//           id="email"
//           placeholder="Enter your email"
//           type="email"
//         />

//         <div className="w-full">
//           <InputField
//             label="Password"
//             id="password"
//             placeholder="Enter your password"
//             type="password"
//           />
//         </div>

//         {/* Login Button */}
//         <button className="bg-white text-black w-full h-16 rounded-2xl mt-4 text-lg font-medium">
//           Login
//         </button>

//         <p className="text-[12px] text-amber-100 font-light mt-2">
//           Don't have an account? <span className="font-bold">Sign up</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import InputField from "../components/InputField";
import { useLogin } from "../hooks/useLogin";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (response) => {
          const { user, accessToken } = response.data;

          // Store token in localStorage
          localStorage.setItem("accessToken", accessToken);

          // Set user in Zustand
          setUser(user);

          // Redirect after login (optional)
          navigate("/home")
      
        },
        onError: (err) => {
          console.error("Login failed", err);
        },
      }
    );
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 h-full bg-cover bg-amber-200" style={{
          backgroundImage: "url('/hero7.jpg')",
        }}></div>

      {/* Right Side */}
      <div className="w-1/2 flex p-20 flex-col bg-black justify-center items-center gap-5">
        <h1 className="text-2xl text-white font-extralight">Login to Your Account</h1>
        <p className="text-xl text-white font-light">
          Enter your credentials to access your account
        </p>

        {/* Google Button */}
        <div className="flex mt-5 rounded-2xl text-amber-50 border justify-center gap-2 border-gray-500 items-center w-[400px] h-[50px] cursor-pointer">
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
        <InputField
          label="Email"
          id="email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          label="Password"
          id="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="bg-white text-black w-full h-16 rounded-2xl mt-4 text-lg font-medium"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {isError && (
          <p className="text-red-500 text-sm mt-2">
            {error?.response?.data?.message || "Login failed"}
          </p>
        )}

        <p className="text-[12px] text-amber-100 font-light mt-2">
          Don't have an account? <span className="font-bold">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
