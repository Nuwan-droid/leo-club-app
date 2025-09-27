import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import EventCard from "./EventCard";
import axios from "axios";

function EventCardSlider() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPDF, setShowPDF] = useState(false);
  const [currentPDFUrl, setCurrentPDFUrl] = useState("");

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  // Fetch newsletters from backend
useEffect(() => {
  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5001/api/newsletters");
      const data = res.data.newsletters;

      // Map backend data
      const mappedEvents = data.map((n) => {
        const pdfUrl = `http://localhost:5001${n.filePath}`;
        return {
          id: n._id,
          month: n.month,
          year: n.year,
          imageSrc: n.coverImagePath
            ? `http://localhost:5001${n.coverImagePath}`
            : "https://via.placeholder.com/256x256/cccccc/666666?text=Newsletter",
          pdfUrl: pdfUrl,
          externalUrl: n.url,
          originalName: n.originalName,
        };
      });

      // ✅ Sort newsletters by year and month (latest first)
      const monthOrder = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };

      const sortedEvents = mappedEvents.sort((a, b) => {
        if (parseInt(b.year) !== parseInt(a.year)) {
          return parseInt(b.year) - parseInt(a.year); // sort by year desc
        }
        return monthOrder[b.month] - monthOrder[a.month]; // sort by month desc
      });

      setEvents(sortedEvents);
    } catch (err) {
      console.error("Error fetching newsletters:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchNewsletters();
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

  if (loading) return <p className="text-center mt-4">Loading newsletters...</p>;
  if (!events.length) return <p className="text-center mt-4">No newsletters found.</p>;

  return (
    <div className="flex flex-col items-center mt-10 mb-10 px-4 bg-[#ceceff]/20 pb-8 transition-all duration-700 ease-in-out hover:scale-[1.01] z-50">
      <h2 className="text-3xl font-semibold mt-8 text-[black] mb-4">
        NewsLetter
      </h2>
      <div className="flex items-center space-x-4 w-full max-w-screen-lg overflow-x-auto sm:overflow-visible no-scrollbar">
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
            <div key={event.id} className="relative group">
          <EventCard
            month={event.month}
            year={event.year}
            imageSrc={event.imageSrc}
            pdfUrl={event.pdfUrl}
            originalName={event.originalName}
            onViewDetails={() => {
              setCurrentPDFUrl(event.externalUrl);
              setShowPDF(true);
            }}
          />

            </div>
          ))}
        </div>

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

      {showPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Document Viewer</h3>
              <button
                onClick={() => setShowPDF(false)}
                className="p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600"
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
                title="Newsletter PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCardSlider;