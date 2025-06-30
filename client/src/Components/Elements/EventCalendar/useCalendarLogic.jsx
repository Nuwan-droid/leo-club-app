import { useState } from 'react';

const useCalendarLogic = () => {
  const [currentDate, setCurrentDate] = useState(new Date());


 
  
  const events = [
    {
      id: 1,
      title: 'Seeds for Hope',
      date: '2025-06-18',
      time: '10:00am',
      location: 'Nika/Wari/ Ganthiriyawa Maha Vidyalaya',
      color: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-400'
    },
    {
      id: 2,
      title: 'Senehase Arunelu',
      date: '2025-06-26',
      time: '09:30am',
      location: 'Senasuma Elders’ Home- Bandarawela',
      color: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-400'
    },
    {
      id: 3,
      title: 'Hope for Paws',
      date: '2025-07-10',
      time: '02:00pm',
      location: 'Uva Wellassa University',
      color: 'bg-blue-100 text-blue-800 border-l-4 border-blue-400'
    },
  ];

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
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };


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