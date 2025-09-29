import React, { useState } from 'react';
import CalendarHeader from '../Elements/EventCalendar/CalendarHeader';
import CalendarGrid from '../Elements/EventCalendar/CalendarGrid';
import EventNotes from '../Elements/EventCalendar/EventNotes';
import useCalendarLogic from '../Elements/EventCalendar/useCalendarLogic';

const EventCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Event Notes */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <EventNotes 
            events={events} 
            selectedEvent={selectedEvent}
            onEventClick={handleEventClick}
          />
        </div>

        {/* Main Calendar */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
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
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;