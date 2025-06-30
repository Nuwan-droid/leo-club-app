import React from 'react';

const CalendarHeader = ({ currentMonth, currentYear, onPrevious, onNext }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-medium text-gray-900">
          {months[currentMonth]} {currentYear}
        </h1>
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={onPrevious}
          className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-600 text-lg"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-600 text-lg"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;