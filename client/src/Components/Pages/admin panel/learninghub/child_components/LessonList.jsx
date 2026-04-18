// frontend/src/components/child_components/LessonList.jsx
import React from 'react';
import LessonCard from './LessonCard';

const LessonList = ({ lessons }) => {
  return (
    <div className="space-y-4">
      {lessons.length > 0 ? (
        lessons.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))
      ) : (
        <p className="text-gray-500 text-center">No lessons available.</p>
      )}
    </div>
  );
};

export default LessonList;