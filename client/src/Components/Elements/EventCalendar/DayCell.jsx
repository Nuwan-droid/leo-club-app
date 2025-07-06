import React from 'react';
import Event from './Event';

const DayCell = ({ dayObj, events, isToday, monthName }) => {
  return (
    <div
      className={`min-h-24 p-2 border-r border-gray-200 last:border-r-0 ${
        !dayObj.isCurrentMonth
          ? 'bg-gray-50'
          : isToday
          ? 'bg-blue-50'
          : 'bg-white'
      }`}
    >
      <div className={`text-sm mb-1 ${
        dayObj.isCurrentMonth
          ? (isToday ? 'text-blue-600 font-semibold' : 'text-gray-900')
          : 'text-gray-400'
      }`}>
        {dayObj.day}
        {dayObj.isPrevMonth && dayObj.day > 25 && (
          <span className="text-xs text-gray-400 ml-1">
            {monthName}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        {events.map(event => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default DayCell;