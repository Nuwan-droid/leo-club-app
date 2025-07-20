import React, { useState } from 'react';

const AddSubmissionModal = ({ isOpen, member, onSave, onCancel }) => {
  const [submissionData, setSubmissionData] = useState({
    title: '',
    description: '',
    images: [],
    submissionType: 'newsletter_article'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmissionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSubmissionData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const handleRemoveImage = (index) => {
    setSubmissionData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionData.title && submissionData.description) {
      onSave(submissionData);
      setSubmissionData({ title: '', description: '', images: [], submissionType: 'newsletter_article' });
    }
  };

  const handleCancel = () => {
    setSubmissionData({ title: '', description: '', images: [], submissionType: 'newsletter_article' });
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto outline outline-black">
        <h2 className="text-xl font-semibold mb-4">Add Completed Submission</h2>
        
        {member && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-600">Adding submission for monthly newsletter</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submission Type *
              </label>
              <select
                name="submissionType"
                value={submissionData.submissionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="newsletter_article">Newsletter Article</option>
                <option value="photo_submission">Photo Submission</option>
                <option value="event_report">Event Report</option>
                <option value="member_spotlight">Member Spotlight</option>
                <option value="community_project">Community Project</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={submissionData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter submission title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={submissionData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter detailed description of the submission"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                  </svg>
                  <span className="text-sm text-gray-600">Click to upload images</span>
                  <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</span>
                </label>
              </div>
              
              {submissionData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {submissionData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Submission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubmissionModal;
