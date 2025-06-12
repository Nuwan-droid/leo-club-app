import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from './EventCard'; // Import your EventCard component
import { useRef } from 'react';

function EventCardSlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // scroll 80% of visible area
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative m-8">
      {/* Left Button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-gray-100"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Scrollable Card Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
      >
        <EventCard />
        
        
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-gray-100"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}

export default EventCardSlider;
