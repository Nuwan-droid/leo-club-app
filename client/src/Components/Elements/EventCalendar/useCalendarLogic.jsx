import { useEffect, useState } from 'react';

const useCalendarLogic = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;

  // 🔄 Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/events');
        const data = await res.json();
        if (data.success) {
          setEvents(
            data.events.map(ev => ({
              id: ev._id,
              title: ev.name,
              date: ev.date,
              time: ev.time,
              location: ev.location,
              description: ev.description,
              coverImage: ev.coverImage,
              color: 'bg-blue-100 text-blue-800 border-l-4 border-blue-400'
            }))
          );
        } else {
          console.error('Failed to load events');
        }
      } catch (err) {
        console.error('Error loading events:', err);
      }
    };

    fetchEvents();
  }, []);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // 🧮 Calendar grid logic
  const calendarDays = [];

  const prevMonth = new Date(year, month - 1, 0);
  for (let i = startingDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonth.getDate() - i,
      isCurrentMonth: false,
      isPrevMonth: true
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day: day,
      isCurrentMonth: true,
      isPrevMonth: false
    });
  }

  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day: day,
      isCurrentMonth: false,
      isPrevMonth: false
    });
  }

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return {
    currentDate,
    year,
    month,
    months,
    events,
    weeks,
    goToPreviousMonth,
    goToNextMonth,
    getEventsForDate,
    isToday
  };
};

export default useCalendarLogic;