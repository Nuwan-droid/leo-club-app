import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // beautiful chevron icons
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
      <h2 className="text-3xl font-semibold mt-8 text-[black] mb-4">NewsLetter</h2>
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

        {/* Cards */}
        <div className="flex space-x-4">
          {visibleEvents.map((event, index) => (
            <EventCard
              key={index}
              month={event.month}
              year={event.year}
              imageSrc={event.imageSrc}
            />
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