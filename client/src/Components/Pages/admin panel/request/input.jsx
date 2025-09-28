import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  required = false,
  className = "",
  error = false, // Added error prop for styling invalid inputs
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`border ${error ? "border-red-500" : "border-gray-300"} p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out placeholder-gray-400 text-sm ${className}`}
    />
  );
};

export default Input;