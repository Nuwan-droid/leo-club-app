import React from 'react';
import LessonCard from './LessonCard';

const LessonList = ({ lessons }) => {
  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
};

export default LessonList;
