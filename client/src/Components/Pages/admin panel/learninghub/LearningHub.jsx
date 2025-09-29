// frontend/src/components/LearningHub.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LessonList from './child_components/LessonList';
import FileUploadModal from './child_components/FileUploadModal';

const LearningHub = () => {
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');
        if (!token) throw new Error('No admin token found');
        const response = await axios.get('http://localhost:5001/api/learninghub', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Lessons:', response.data);
        setLessons(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch lessons');
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const handleAddLesson = () => {
    setIsModalOpen(true);
  };

  const handleSubmitLesson = async (lessonData) => {
    try {
      const token = sessionStorage.getItem('adminToken');
      if (!token) throw new Error('No admin token found');
      const formData = new FormData();
      formData.append('title', lessonData.title);
      formData.append('description', lessonData.description);
      formData.append('type', lessonData.type);
      if (lessonData.image) formData.append('image', lessonData.image);
      if (lessonData.source_file) formData.append('source_file', lessonData.source_file);

      const response = await axios.post('http://localhost:5001/api/learninghub', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setLessons([response.data, ...lessons]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Upload Error:', err.response?.data || err.message);
      alert(`Failed to upload lesson: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const displayedLessons = showAll ? lessons : lessons.slice(0, 4);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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