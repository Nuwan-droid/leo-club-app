import React, { useState } from 'react';

const AddScoreModal = ({ isOpen, member, onSave, onCancel }) => {
  const [scoreData, setScoreData] = useState({
    score: '',
    reason: '',
    adminNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScoreData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (scoreData.score && scoreData.reason) {
      onSave({
        ...scoreData,
        score: parseInt(scoreData.score),
        date: new Date().toISOString().split('T')[0]
      });
      setScoreData({ score: '', reason: '', adminNotes: '' });
    }
  };

  const handleCancel = () => {
    setScoreData({ score: '', reason: '', adminNotes: '' });
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 outline outline-black ">
        <h2 className="text-xl font-semibold mb-4">Add Score</h2>
        
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
                <p className="text-sm text-gray-600">Current Score: {member.score || 0}</p>
              </div>
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
                value={scoreData.score}
                onChange={handleInputChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter score (1-100)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Score *
              </label>
              <select
                name="reason"
                value={scoreData.reason}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select reason</option>
                <option value="newsletter_contribution">Newsletter Contribution</option>
                <option value="article_submission">Article Submission</option>
                <option value="event_participation">Event Participation</option>
                <option value="leadership_activity">Leadership Activity</option>
                <option value="community_service">Community Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notes
              </label>
              <textarea
                name="adminNotes"
                value={scoreData.adminNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional notes (optional)"
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
