import React from "react";

const AdminInput = ({ label, type = "text", value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-black rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default AdminInput;
