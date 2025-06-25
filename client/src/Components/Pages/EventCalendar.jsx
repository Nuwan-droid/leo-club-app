import React from 'react';
import CalendarHeader from '../Elements/EventCalendar/CalendarHeader';
import CalendarGrid from '../Elements/EventCalendar/CalendarGrid';
import EventNotes from '../Elements/EventCalendar/EventNotes';
import useCalendarLogic from '../Elements/EventCalendar/useCalendarLogic';

const EventCalendar = () => {
  const {
    year,
    month,
    months,
    events,
    weeks,
    goToPreviousMonth,
    goToNextMonth,
    getEventsForDate,
    isToday
  } = useCalendarLogic();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen mt-20">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <CalendarHeader
          currentMonth={month}
          currentYear={year}
          onPrevious={goToPreviousMonth}
          onNext={goToNextMonth}
        />

        <CalendarGrid
          weeks={weeks}
          getEventsForDate={getEventsForDate}
          isToday={isToday}
          monthName={months[month - 1] || 'December'}
        />
      </div>

      <EventNotes events={events} />
    </div>
  );
};

export default EventCalendar;