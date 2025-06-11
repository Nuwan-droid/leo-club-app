import PropTypes from "prop-types";
export default function Input({ type, placeholder, value, className = ""}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required
      value={value}
      className={` className="w-full px-4 py-3 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" ${className}`}
     
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
};
