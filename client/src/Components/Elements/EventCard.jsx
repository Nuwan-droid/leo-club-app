import PropTypes from "prop-types";
import Button from "./Button";

export default function EventCard({ imageSrc, month, year, className = "" }) {
  return (
    <div
      className={`
        w-full max-w-[260px] sm:max-w-sm 
        bg-[#F2F4F7] text-center 
        py-4 sm:py-6 px-2 sm:px-4 
        rounded-xl shadow-sm 
        ${className}
      `}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`${month} ${year}`}
          className="w-32 h-32 sm:w-64 sm:h-64 object-cover mx-auto mb-3 sm:mb-4"
        />
      )}
      <h3 className="text-base sm:text-lg font-medium text-gray-700">{month}</h3>
      <p className="text-xl sm:text-2xl font-semibold text-gray-900">{year}</p>
      <Button
        label="Download"
        className="login mt-2 sm:mt-4 text-sm sm:text-base"
        onClick={() => {}}
      />
    </div>
  );
}

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
  className: PropTypes.string,
};

EventCard.defaultProps = {
  imageSrc: "https://via.placeholder.com/80",
  month: "January",
  year: "2025",
  className: "",
};
