import React, { useState } from 'react';

const AddContributionModal = ({ isOpen, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    projectId: '',
    projectChair: false,
    organizingCommittee: true,
    participating: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.projectId) {
      const projectType = formData.organizingCommittee ? 'Organizing committee' : '';
      const participation = formData.participating ? 'Participating' : '';
      
      onSave({
        projectId: formData.projectId,
        projectType,
        participation
      });
      setFormData({
        projectId: '',
        projectChair: false,
        organizingCommittee: true,
        participating: true
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      projectId: '',
      projectChair: false,
      organizingCommittee: true,
      participating: true
    });
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 outline outline-black">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter project Id
              </label>
              <input
                type="text"
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Chair
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="projectChair"
                  checked={formData.projectChair}
                  onChange={handleCheckboxChange}
                  className="mr-2 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Project Chair</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organizing committee
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="organizingCommittee"
                  checked={formData.organizingCommittee}
                  onChange={handleCheckboxChange}
                  className="mr-2 rounded border-gray-300"
                />
                <span className="text-sm text-green-600">Organizing committee</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Participating
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="participating"
                  checked={formData.participating}
                  onChange={handleCheckboxChange}
                  className="mr-2 rounded border-gray-300"
                />
                <span className="text-sm text-green-600">Participating</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContributionModal;
