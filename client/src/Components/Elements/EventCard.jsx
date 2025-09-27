import PropTypes from "prop-types";
import Button from "./Button";

export default function EventCard({ 
  imageSrc, 
  month, 
  year, 
  className = "", 
  pdfUrl, 
  title, 
  originalName,
  onViewDetails
}) {
  // Function to handle download
  const handleDownload = async () => {
    if (!pdfUrl) return;

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const filename = originalName || `${month}-${year}-Newsletter.pdf`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      try {
        window.open(pdfUrl, "_blank");
      } catch (fallbackError) {
        console.error("Fallback failed:", fallbackError);
        alert("Download failed. Please try again.");
      }
    }
  };

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

      <div className="relative group">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={`${month} ${year} Newsletter Cover`}
            className="w-32 h-32 sm:w-64 sm:h-64 object-cover mx-auto mb-3 sm:mb-4 rounded-lg"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x400?text=Newsletter";
            }}
          />
        )}

        {/* ✅ Centered overlay button */}
        {onViewDetails && (
          <div
            className="absolute inset-0 flex items-center justify-center 
                       bg-opacity-0 group-hover:bg-opacity-40 
                       rounded-lg transition-all duration-300 cursor-pointer"
            onClick={onViewDetails}
          >
            <button
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 
                         bg-white text-gray-800 px-4 py-2 rounded-lg font-medium 
                         shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Details
            </button>
          </div>
        )}
      </div>

      <h3 className="text-base sm:text-lg font-medium text-gray-700">{month}</h3>
      <p className="text-xl sm:text-2xl font-semibold text-gray-900">{year}</p>

      {title && (
        <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">{title}</p>
      )}

      <Button
        label="Download"
        className="login mt-2 sm:mt-4 text-sm sm:text-base"
        onClick={handleDownload}
      />

    </div>
  );
}

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
  className: PropTypes.string,
  pdfUrl: PropTypes.string,
  title: PropTypes.string,
  originalName: PropTypes.string,
  onViewDetails: PropTypes.func,
};

EventCard.defaultProps = {
  imageSrc: "https://via.placeholder.com/300x400?text=Newsletter",
  month: "January",
  year: "2025",
  className: "",
  pdfUrl: "",
  title: "",
  originalName: "",
  onViewDetails: null,
};
