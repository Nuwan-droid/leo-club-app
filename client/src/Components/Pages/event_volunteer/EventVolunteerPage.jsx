// EventVolunteerPage.jsx
import React, { useState, useEffect } from "react";
import EventDetailsPopup from "./EventDetailsPopup";
import RequestEventPopup from "./RequestEventPopup";
import Navbar from "../memberportal/memberportalnav";
import BasicDateCalendar from "./BasicDateCalendar";

const EventVolunteerPage = () => {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);
        const eventsData = data.events || (Array.isArray(data) ? data : []);
        console.log('Set upcomingEvents:', eventsData); // Debug log
        setUpcomingEvents(eventsData);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
        setUpcomingEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="relative h-64 bg-gradient-to-r from-blue-400 to-green-400">
        <img
          src="/homebuilding.png"
          alt="Leo Club Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">LEO</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              {isLoading ? (
                <p className="text-gray-600">Loading events...</p>
              ) : error ? (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                  {error}
                </div>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-gray-600">No upcoming events found.</p>
              ) : (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id || event._id}
                    className="bg-white rounded-lg shadow-sm border p-6 mb-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-lg font-semibold text-gray-900 mr-2">
                            {event.date}
                          </span>
                          <span className="text-gray-600">{event.day}</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm text-gray-600">
                            {event.time}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {event.title || event.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {event.location}
                        </p>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {event.type || "Service projects"}
                        </span>
                      </div>
                      <img
                        src="/event2.png"
                        alt={event.title || event.name}
                        className="w-24 h-24 object-cover rounded-lg ml-4"
                        onError={() => console.log(`Failed to load image for event: ${event.title || event.name}`)} 
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="lg:w-80">
            <button
              onClick={() => setShowRequestForm(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6"
            >
              + Request for New Event
            </button>
            <div className="bg-blue-100 rounded-lg shadow-sm border p-4">
              <BasicDateCalendar />
            </div>
          </div>
        </div>
      </div>
      {showEventDetails && (
        <EventDetailsPopup
          event={selectedEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
      {showRequestForm && (
        <RequestEventPopup onClose={() => setShowRequestForm(false)} />
      )}
    </div>
  );
};

export default EventVolunteerPage;