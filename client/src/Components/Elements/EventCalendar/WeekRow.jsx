import React from 'react';
import DayCell from './DayCell';

const WeekRow = ({ week, weekIndex, getEventsForDate, isToday, monthName }) => {
  return (
    <div className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
      {/* Week number */}
      <div className="p-3 text-xs text-gray-400 text-center bg-gray-50 border-r border-gray-200">
        {weekIndex + 14}
      </div>
      
      {/* Days */}
      {week.map((dayObj, dayIndex) => {
        const dayEvents = dayObj.isCurrentMonth ? getEventsForDate(dayObj.day) : [];
        const todayCheck = dayObj.isCurrentMonth && isToday(dayObj.day);
        
        return (
          <DayCell
            key={dayIndex}
            dayObj={dayObj}
            events={dayEvents}
            isToday={todayCheck}
            monthName={monthName}
          />
        );
      })}
    </div>
  );
};

export default WeekRow;