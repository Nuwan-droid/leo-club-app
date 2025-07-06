import React, { useState } from 'react';
import EventDetailsPopup from './EventDetailsPopup';
import RequestEventPopup from './RequestEventPopup';
import Navbar from "../memberportal/memberportalnav";
import BasicDateCalendar from "./BasicDateCalendar";

const EventVolunteerPage = () => {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const upcomingEvents = [
    {
      id: 1,
      date: 'July 28',
      day: 'Monday',
      time: '10:00 AM',
      title: 'Seeds for Hope',
      location: 'Nika/wari/ Katupatha M.V.',
      type: 'Workshop',
      image: '../../../../public/event1.png'
    }
  ];

  const pastEvents = [
    {
      id: 2,
      date: 'march 05',
      day: 'Friday',
      time: '10:00 AM',
      title: 'Snehaloka',
      location: 'Badulla Hospital',
      type: 'Workshop',
      image: '../../../../public/event2.png'
    },
    {
      id: 3,
      date: 'April 11',
      day: 'Friday',
      time: '10:00 AM',
      title: 'Degree Vistas',
      location: 'Uva wellassa University',
      type: 'Workshop',
      image: '../../../../public/event3.png'
    }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-400 to-green-400">
        <img 
          src="../../../../public/homebuilding.png" 
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Events */}
          <div className="flex-1">
            {/* Event Categories */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Events</h1>
              <div className="flex space-x-4 mb-6">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">Service projects</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Webinar</button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Workshop</button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm border p-6 mb-4 cursor-pointer hover:shadow-md transition-shadow"
                     onClick={() => handleEventClick(event)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-lg font-semibold text-gray-900 mr-2">{event.date}</span>
                        <span className="text-gray-600">{event.day}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm text-gray-600">{event.time}</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{event.location}</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded-lg ml-4"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Past Events */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Events</h2>
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm border p-6 mb-4 cursor-pointer hover:shadow-md transition-shadow"
                     onClick={() => handleEventClick(event)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-lg font-semibold text-gray-900 mr-2">{event.date}</span>
                        <span className="text-gray-600">{event.day}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm text-gray-600">{event.time}</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{event.location}</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded-lg ml-4"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Calendar and Request Button */}
          <div className="lg:w-80">
            <button 
              onClick={() => setShowRequestForm(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6"
            >
              + Request for New  Event
            </button>

            {/* Calendar */}
            <div className=" bg-blue-100 rounded-lg shadow-sm border p-4">
             <BasicDateCalendar/>
            </div>
          </div>
        </div>
      </div>

      

      {/* Popups */}
      {showEventDetails && (
        <EventDetailsPopup 
          event={selectedEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
      
      {showRequestForm && (
        <RequestEventPopup 
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </div>
  );
};

export default EventVolunteerPage;
