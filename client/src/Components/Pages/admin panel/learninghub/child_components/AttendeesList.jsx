import React from 'react';

const AttendeesList = ({ attendees, additionalCount }) => {
  return (
    <div className="flex items-center space-x-1">
      {attendees.map((attendee, index) => (
        <img
          key={attendee.id}
          src={attendee.avatar}
          alt={`Attendee ${index + 1}`}
          className="w-8 h-8 rounded-full border-2 border-white object-cover"
          style={{ marginLeft: index > 0 ? '-8px' : '0' }}
        />
      ))}
      
      {additionalCount > 0 && (
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
             style={{ marginLeft: '-8px' }}>
          +{additionalCount}
        </div>
      )}
    </div>
  );
};

export default AttendeesList;
