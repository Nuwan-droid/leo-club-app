// CalendarGrid.jsx
import React from 'react';
import WeekRow from './WeekRow';

const CalendarGrid = ({ weeks, getEventsForDate, isToday, monthName, onEventClick }) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white">
      {/* Header with day names */}
      <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
        <div className="p-3 text-xs font-semibold text-gray-500 text-center border-r border-gray-200">
          Week
        </div>
        {weekDays.map(day => (
          <div key={day} className="p-3 text-xs font-semibold text-gray-500 text-center border-r border-gray-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar weeks */}
      {weeks.map((week, weekIndex) => (
        <WeekRow
          key={weekIndex}
          week={week}
          weekIndex={weekIndex}
          getEventsForDate={getEventsForDate}
          isToday={isToday}
          monthName={monthName}
          onEventClick={onEventClick} // Pass onEventClick prop
        />
      ))}
    </div>
  );
};

export default CalendarGrid;