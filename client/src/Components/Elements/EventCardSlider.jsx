import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventCard from "./EventCard";
import axios from "axios";

function EventCardSlider() {
  const [events, setEvents] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  // Fetch newsletters
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/files"); 
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch newsletters:", err);
      }
    };
    fetchEvents();
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? events.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= events.length
        ? 0
        : Math.min(prev + 1, events.length - visibleCount)
    );
  };

  const visibleEvents = events.slice(startIndex, startIndex + visibleCount);

  // Handle download
  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/files/download/${filename}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-10 px-4 bg-[#ceceff]/20 pb-8 transition-all duration-700 ease-in-out hover:scale-[1.01] z-50">
      <h2 className="text-3xl font-semibold mt-8 text-[black] mb-4">
        NewsLetter
      </h2>
      <div className="flex items-center space-x-4 w-full max-w-screen-lg overflow-x-auto sm:overflow-visible no-scrollbar">
        {/* Prev Button */}
        {events.length > visibleCount && (
          <button
            onClick={handlePrev}
            className="hidden sm:inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black rounded-full w-10 h-10 transition-colors duration-200 shadow-md"
            aria-label="Previous"
          >
            <FaChevronLeft size={22} />
          </button>
        )}

        {/* Slider */}
        <div className="flex space-x-4">
          {visibleEvents.map((event, index) => (
            <div key={index} className="relative group">
              {/* Preview Card */}
              <EventCard
                month={event.month}
                year={event.year}
                imageSrc={event.imageSrc}
              />

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center space-x-3">
                {/* View Online */}
                <button
                  onClick={() => window.open(event.viewUrl, "_blank")}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-800 px-3 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View Online
                </button>

                {/* Download */}
                <button
                  onClick={() => handleDownload(event.filename)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        {events.length > visibleCount && (
          <button
            onClick={handleNext}
            className="hidden sm:inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black rounded-full w-10 h-10 transition-colors duration-200 shadow-md"
            aria-label="Next"
          >
            <FaChevronRight size={22} />
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCardSlider;
