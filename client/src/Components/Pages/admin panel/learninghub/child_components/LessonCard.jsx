import React from 'react';
import AttendeesList from './AttendeesList';

const LessonCard = ({ lesson }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{lesson.date}</p>
        <p className="text-sm text-gray-500 mb-1">{lesson.location}</p>
        <p className="text-sm text-gray-500 mb-3">{lesson.city}</p>
        
        <AttendeesList 
          attendees={lesson.attendees} 
          additionalCount={lesson.additionalCount}
        />
      </div>
    </div>
  );
};

export default LessonCard;
