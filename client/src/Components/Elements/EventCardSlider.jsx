import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import EventCard from "./EventCard";
import april from "../../assets/NewsLetters/april.png";
import feb from "../../assets/NewsLetters/feb.jpg";
import march from "../../assets/NewsLetters/march.jpg";
import jan from "../../assets/NewsLetters/jan.jpg";
import dec from "../../assets/NewsLetters/dec.jpg";

const events = [
  { month: "April", year: 2025, imageSrc: april },
  { month: "March", year: 2025, imageSrc: march },
  { month: "February", year: 2025, imageSrc: feb },
  { month: "January", year: 2025, imageSrc: jan },
  { month: "December", year: 2024, imageSrc: dec },
];

function EventCardSlider() {
  const [showPDF, setShowPDF] = useState(false);
  const [currentPDFUrl, setCurrentPDFUrl] = useState("");

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

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

  return (
    <div className="flex flex-col items-center mt-10 mb-10 px-4 bg-[#ceceff]/20 pb-8 transition-all duration-700 ease-in-out hover:scale-[1.01]">
      <h2 className="text-3xl font-semibold mt-8 text-[black] mb-4">
        NewsLetter
      </h2>
      <div className="flex items-center space-x-4 w-full max-w-screen-lg overflow-x-auto sm:overflow-visible no-scrollbar">
        {/* Prev Button (hidden on mobile) */}
        {events.length > visibleCount && (
          <button
            onClick={handlePrev}
            className="hidden sm:inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-black rounded-full w-10 h-10 transition-colors duration-200 shadow-md"
            aria-label="Previous"
          >
            <FaChevronLeft size={22} />
          </button>
        )}

        <div className="flex space-x-4">
          {visibleEvents.map((event, index) => (
            <div key={index} className="relative group">
              <EventCard
                month={event.month}
                year={event.year}
                imageSrc={event.imageSrc}
              />
              {/* External Link Overlay */}
              <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <button
                  onClick={() => {
                    setCurrentPDFUrl(
                      event.externalUrl ||
                        "https://heyzine.com/flip-book/45135708e7.html"
                    );
                    setShowPDF(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            
              {showPDF && (
                <div className="fixed inset-0 bg-transparent bg-opacity-75 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="text-lg font-semibold">Document Viewer</h3>
                      <button
                        onClick={() => setShowPDF(false)}
                        className="p-2 bg-red-800 -100 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex-1 p-4">
                      <iframe
                        src={currentPDFUrl}
                        className="w-full h-full border-0 rounded"
                        allowFullScreen
                        allow="clipboard-write"
                        scrolling="no"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Button (hidden on mobile) */}
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
