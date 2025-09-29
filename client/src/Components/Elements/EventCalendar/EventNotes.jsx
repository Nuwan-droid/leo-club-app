import React, { useEffect, useRef, useMemo } from 'react';

const EventNotes = ({ events, selectedEvent, onEventClick }) => {
  const detailsRef = useRef(null);

  useEffect(() => {
    if (selectedEvent && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedEvent]);

  // Reorder events to put selected event first
  const orderedEvents = useMemo(() => {
    if (!selectedEvent) return events;
    
    const otherEvents = events.filter(event => event.id !== selectedEvent.id);
    return [selectedEvent, ...otherEvents];
  }, [events, selectedEvent]);

  return (
    <div className="bg-blue-100 rounded-lg shadow-lg border border-gray-100 p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {orderedEvents.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No events scheduled</p>
          </div>
        ) : (
          orderedEvents.map((event, index) => (
            <div key={event.id}>
              {/* Event Summary */}
              <div 
                onClick={() => onEventClick(event)}
                className={`group relative p-4 rounded-xl border-l-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                  selectedEvent?.id === event.id 
                    ? 'bg-blue-50 border-blue-500 shadow-md transform scale-102' 
                    : 'bg-gray-50 border-gray-300'
                } cursor-pointer ${
                  selectedEvent?.id === event.id && index === 0 ? 'animate-slideInFromTop' : ''
                }`}
                ref={selectedEvent?.id === event.id && index === 0 ? detailsRef : null}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                
                <div className="pr-6">
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                </div>
              </div>

              {/* Expanded Event Details */}
              {selectedEvent?.id === event.id && (
                <div className="mt-2 p-4 bg-white border border-blue-200 rounded-xl shadow-inner animate-slideDown">
                  {event.coverImage && (
                    <img
                      src={`http://localhost:5001/events/${event.coverImage}`}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-semibold text-gray-500 uppercase mb-1">Event Name</h5>
                      <p className="text-gray-900 font-medium">{event.title}</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-semibold text-gray-500 uppercase mb-1">Date & Time</h5>
                      <p className="text-gray-900">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long', 
                          day: 'numeric'
                        })} at {event.time}
                      </p>
                    </div>

                    {event.location && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 uppercase mb-1">Location</h5>
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-gray-900">{event.location}</p>
                        </div>
                      </div>
                    )}

                    {event.description && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-500 uppercase mb-1">Description</h5>
                        <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onEventClick(null)}
                    className="mt-4 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Close Details
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInFromTop {
          from {
            opacity: 0.7;
            transform: translateY(-20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideInFromTop {
          animation: slideInFromTop 0.4s ease-out;
        }
        .transform.scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default EventNotes;