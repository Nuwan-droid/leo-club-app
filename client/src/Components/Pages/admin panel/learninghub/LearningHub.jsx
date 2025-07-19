import React, { useState } from 'react';
import LessonList from './child_components/LessonList';
import FileUploadModal from './child_components/FileUploadModal';

const LearningHub = () => {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Design Conference',
      date: 'Today 07:19 AM',
      location: '56 Davion Mission Suite 157',
      city: 'Meaghanberg',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      ],
      additionalCount: 15,
      image: 'https://randomuser.me/api/portraits/men/10.jpg'
    },
    {
      id: 2,
      title: 'Weekend Festival',
      date: '16 October 2019 at 5:00 PM',
      location: '853 Moore Flats Suite 158',
      city: 'Sweden',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
      ],
      additionalCount: 20,
      image: 'https://randomuser.me/api/portraits/women/15.jpg'
    },
    {
      id: 3,
      title: 'Glastonbury Festival',
      date: '20-22 October 2019 at 8:00 PM',
      location: '646 Walter Road Apt. 571',
      city: 'Turks and Caicos Islands',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
      ],
      additionalCount: 14,
      image: 'https://randomuser.me/api/portraits/women/20.jpg'
    },
    {
      id: 4,
      title: 'Ultra Europe 2019',
      date: '25 October 2019 at 10:00 PM',
      location: '506 Satterfield Tunnel Apt. 963',
      city: 'San Marino',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
      ],
      additionalCount: 12,
      image: 'https://randomuser.me/api/portraits/women/25.jpg'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleAddLesson = () => {
    setIsModalOpen(true);
  };

  const handleSubmitLesson = (lessonData) => {
    const newLesson = {
      id: lessons.length + 1,
      title: lessonData.title,
      date: 'Today',
      location: 'New Location',
      city: 'New City',
      attendees: [],
      additionalCount: 0,
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    
    setLessons([newLesson, ...lessons]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const displayedLessons = showAll ? lessons : lessons.slice(0, 4);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={handleAddLesson}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-6 flex items-center justify-center space-x-2"
          >
            <span className="text-lg">+</span>
            <span>Add New Lesson</span>
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Previous Uploads</h2>
            <LessonList lessons={displayedLessons} />
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              {showAll ? 'Show Less' : 'See More'}
            </button>
          </div>
        </div>
      </div>

      <FileUploadModal
        isOpen={isModalOpen}
        onSubmit={handleSubmitLesson}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default LearningHub;
