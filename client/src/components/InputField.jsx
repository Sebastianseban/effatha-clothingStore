import React from "react";

const InputField = ({ label, id, placeholder, type = "text", value, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm sm:text-xl text-amber-50">
        {label}
      </label>
      <div className="bg-[#1a1a1aba] mt-2 rounded-2xl p-2">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-none p-1.5 sm:p-0 sm:h-[50px] outline-none text-amber-100 placeholder:text-xs sm:placeholder:text-sm "
        />
      </div>
    </div>
  );
};

export default InputField;
