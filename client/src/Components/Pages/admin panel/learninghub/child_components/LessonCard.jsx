// frontend/src/components/child_components/LessonCard.jsx
import React from 'react';

const LessonCard = ({ lesson }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        {lesson.image ? (
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{lesson.description}</p>
        <p className="text-sm text-gray-500 mb-1">Type: {lesson.type.toUpperCase()}</p>
        <a
          href={lesson.sourceFile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          View Source
        </a>
      </div>
    </div>
  );
};

export default LessonCard;