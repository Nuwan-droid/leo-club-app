import React from 'react';

const EventNotes = ({ events }) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-3">Notes</h3>
      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className={`p-3 rounded ${event.color}`}>
            <div className="font-semibold text-sm">{event.title}</div>
            <div className="text-xs mt-1 opacity-75">
              {new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs opacity-75">{event.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventNotes;