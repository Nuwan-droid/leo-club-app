import React, { useState } from 'react';

const AddScoreModal = ({ isOpen, volunteer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    score: '',
    reason: '',
    adminNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.score && formData.reason) {
      onSave({
        ...formData,
        score: parseInt(formData.score),
        date: new Date().toISOString().split('T')[0]
      });
      setFormData({ score: '', reason: '', adminNotes: '' });
    }
  };

  const handleCancel = () => {
    setFormData({ score: '', reason: '', adminNotes: '' });
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 outline outline-black">
        {volunteer && (
          <div className="mb-4 flex items-center space-x-3">
            <img
              src={volunteer.avatar}
              alt={volunteer.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-600">Current Score: {volunteer.score || 0}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score to Add *
              </label>
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleInputChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Score *
              </label>
              <input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notes
              </label>
              <textarea
                name="adminNotes"
                value={formData.adminNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScoreModal;
