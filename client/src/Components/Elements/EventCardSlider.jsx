import { useState } from "react";
import EventCard from "./EventCard";
import girlImage from "../../assets/girl.jpeg";
import lionImage from "../../assets/lion.svg";

const events = [
  { month: "July", year: 2024, imageSrc: girlImage },
  { month: "August", year: 2025, imageSrc: lionImage },
  { month: "September", year: 2023, imageSrc: girlImage },
  { month: "October", year: 2022, imageSrc: lionImage },
  { month: "November", year: 2021, imageSrc: girlImage },
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
    <div className="flex flex-col items-center mt-10 mb-10 px-4">
      <h2 className="text-3xl font-semibold mt-8 text-[black] mb-4">NewsLetter</h2>
      <div className="flex items-center space-x-4 w-full max-w-screen-lg overflow-x-auto sm:overflow-visible no-scrollbar">
        {/* Prev Button (hidden on mobile) */}
        {events.length > visibleCount && (
          <button
            onClick={handlePrev}
            className="hidden sm:inline-block bg-gray-300 hover:bg-gray-400 text-black rounded-full px-4 py-2"
          >
            ←
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
            className="hidden sm:inline-block bg-gray-300 hover:bg-gray-400 text-black rounded-full px-4 py-2"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCardSlider;
