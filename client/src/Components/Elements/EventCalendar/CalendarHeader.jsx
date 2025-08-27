import React from 'react';

const CalendarHeader = ({ currentMonth, currentYear, onPrevious, onNext }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-100 to-blue-50 shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-indigo-800 tracking-tight drop-shadow-lg flex items-center gap-2">
          <svg className="w-7 h-7 text-indigo-500 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2m-6.364-1.636l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414"/>
          </svg>
          {months[currentMonth]} <span className="ml-1 text-blue-500">{currentYear}</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevious}
          className="p-2 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-full shadow text-indigo-600 hover:text-indigo-900 text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Previous Month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="p-2 bg-white hover:bg-indigo-100 border border-indigo-300 rounded-full shadow text-indigo-600 hover:text-indigo-900 text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Next Month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};


export default CalendarHeader;