import PropTypes from "prop-types";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({ type, placeholder, className }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-10 border text-[gray]  border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 ${className}`}
        required
      />
      {isPassword && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[gray]"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
