import React from 'react';

const CalendarGridHeader = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="grid grid-cols-8 border-b border-gray-200">
      <div className="p-3 text-xs font-medium text-gray-500 text-center bg-gray-50">
        Week
      </div>
      {daysOfWeek.map(day => (
        <div key={day} className="p-3 text-xs font-medium text-gray-500 text-center bg-gray-50">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarGridHeader;