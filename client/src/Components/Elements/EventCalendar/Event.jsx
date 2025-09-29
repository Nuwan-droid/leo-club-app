
import React from 'react';

const Event = ({ event, onEventClick }) => {
  const handleClick = () => {
    if (onEventClick && typeof onEventClick === 'function') {
      onEventClick(event);
    } else {
      console.error('onEventClick is not a function:', onEventClick);
    }
  };

  return (
    <div 
      className={`text-xs p-1 rounded ${event.color} font-medium cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={handleClick}
    >
      <div className="font-semibold truncate">{event.title}</div>
      <div className="text-xs opacity-75">{event.time}</div>
    </div>
  );
};

export default Event;