import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

const AddEventCalendar = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    time: '',
    location: ''
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      const result = await res.json();
      if (result.success) {
        alert('Event added successfully!');
        setEventDetails({ name: '', date: '', time: '', location: '' });
      } else {
        alert('Failed to add event.');
      }
    } catch (err) {
      console.error('Event save error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-black from-blue-50 to-indigo-100 py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl mx-auto p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 flex items-center justify-center gap-3">
          <Calendar className="h-8 w-8" />
          Add New Event
        </h2>
        <div className="space-y-6">
          
          {/* Event Name */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={eventDetails.name}
                onChange={handleChange}
                type="text"
                name="name"
                required
                placeholder="Enter event name"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
              <input
                value={eventDetails.date}
                onChange={handleChange}
                type="date"
                name="date"
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                style={{
                  colorScheme: 'light'
                }}
              />
            </div>
          </div>

          {/* Time */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
              <input
                value={eventDetails.time}
                onChange={handleChange}
                type="time"
                name="time"
                required
                className="w-full pl-11 pr-4 py-3 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                style={{
                  colorScheme: 'light'
                }}
              />
            </div>
          </div>

          {/* Location */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={eventDetails.location}
                onChange={handleChange}
                type="text"
                name="location"
                required
                placeholder="Enter location"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventCalendar;