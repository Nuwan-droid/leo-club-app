import React, { useState, useEffect } from "react";

const AddScoreModal = ({ isOpen, volunteer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    score: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(""); // clear error on change
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const scoreNum = parseInt(formData.score);

    if (!formData.score || isNaN(scoreNum) || scoreNum < 1 || scoreNum > 100) {
      setError("Please enter a valid score between 1 and 100.");
      return;
    }
  
    onSave({
      ...formData,
      score: scoreNum,
      date: new Date().toISOString().split("T")[0],
    });

    setFormData({ score: ""});
  };

  const handleCancelClick = () => {
    setFormData({ score: "" });
    setError("");
    onCancel();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCancelClick();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-100 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl relative transform transition-transform duration-300 ease-in-out scale-100">
        {/* Close button */}
        <button
          onClick={handleCancelClick}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-bold mb-4 text-gray-800">Add Score to Volunteer</h2>

        {volunteer && (
          <div className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src={volunteer.avatar}
                alt={volunteer.name}
                className="w-12 h-12 rounded-full ring-2 ring-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-800">{volunteer.name}</p>
                <p className="text-sm text-gray-500">
                  Current Score:{" "}
                  <span className="font-medium text-gray-700">
                    {volunteer.score || 0}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={validateAndSubmit}>
          <div className="space-y-5">
            {/* Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Score to Add <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleInputChange}
                min="1"
                max="100"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-green-500 
                  focus:border-green-500 transition-shadow duration-200 
                  placeholder-gray-400 text-gray-800"
                placeholder="Enter score (1-100)"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg 
                hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-green-500 text-white rounded-lg 
                hover:bg-green-600 transition-colors duration-200 font-medium flex items-center space-x-1"
            >
              <span>Add Score</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScoreModal;
