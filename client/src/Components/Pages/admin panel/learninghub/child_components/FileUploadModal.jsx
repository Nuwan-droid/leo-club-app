// frontend/src/components/child_components/FileUploadModal.js
import React, { useState } from 'react';

const FileUploadModal = ({ isOpen, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !sourceFile) {
      setError('Title, description, and source file are required');
      return;
    }
    onSubmit({ title, description, image, source_file: sourceFile, type });
    setTitle('');
    setDescription('');
    setImage(null);
    setSourceFile(null);
    setType('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-red-600 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload New Lesson</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select type</option>
            <option value="pdf">PDF</option>
            <option value="mp4">MP4</option>
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Source File (PDF or MP4):</label>
          <input
            type="file"
            accept=".pdf,.mp4"
            onChange={(e) => setSourceFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-md mb-6 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;