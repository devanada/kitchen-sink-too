import React from "react";

// function CustomInput(props) {
function CustomInput({ type, placeholder, value, onChange, disabled }) {
  return (
    <input
      className="bg-slate-500 dark:bg-slate-600 rounded-lg text-white p-2"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

export default CustomInput;
