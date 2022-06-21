import React from "react";

// function CustomInput(props) {
function CustomInput({ type, placeholder, value, onChange, disabled }) {
  return (
    <input
      className="bg-slate-200 rounded-lg text-black p-2 border focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
      type={type}
      placeholder={placeholder}
      // value={value}
      onChange={onChange}
      disabled={disabled}
      defaultValue={value}
    />
  );
}

export default CustomInput;
