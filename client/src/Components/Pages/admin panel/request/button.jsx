import React from "react";

const Button = ({
  type = "button",
  className = "",
  label,
  onClick,
  disabled = false,
  variant = "primary", // Added variant prop for different styles
}) => {
  // Define variant styles
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 ease-in-out ${
        variantStyles[variant] || variantStyles.primary
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;