import React from 'react';

const Event = ({ event }) => {
  return (
    <div className={`text-xs p-1 rounded ${event.color} font-medium`}>
      <div className="font-semibold">{event.title}</div>
      <div className="text-xs opacity-75">{event.time}</div>
      <div className="text-xs opacity-75">{event.location}</div>
    </div>
  );
};

export default Event;