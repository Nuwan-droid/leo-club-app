import React from 'react';
import CalendarGridHeader from './CalendarGridHeader';
import WeekRow from './WeekRow';

const CalendarGrid = ({ weeks, getEventsForDate, isToday, monthName }) => {
  return (
    <div className="bg-white">
      <CalendarGridHeader />
      
      {weeks.map((week, weekIndex) => (
        <WeekRow
          key={weekIndex}
          week={week}
          weekIndex={weekIndex}
          getEventsForDate={getEventsForDate}
          isToday={isToday}
          monthName={monthName}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;