import React, { useState } from "react";
import ImageSlider from "./ImageSlider";

function ProjectDialog({ project, isOpen, onClose, sliderImages = [], reviews = [], onAddReview }) {
  const [showForm, setShowForm] = useState(false);
  const [reviewInput, setReviewInput] = useState("");

  if (!isOpen || !project) return null;

  // Use provided slider images or fallback to just the project image
  const imagesToShow = sliderImages.length > 0 ? [project.image, ...sliderImages] : [project.image];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewInput.trim()) {
      onAddReview(reviewInput.trim());
      setReviewInput("");
      setShowForm(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#000000b0] flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white border-none rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold text-gray-500 cursor-pointer shadow-md hover:text-gray-700 transition-colors z-10"
          >
            ×
          </button>

          <ImageSlider
            images={imagesToShow}
            alt={project.title}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">
              {project.date}
            </p>
            <span className="text-sm text-blue-600 font-medium flex items-center justify-end text-right">
              <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
          <p className="text-lg text-gray-600 mb-4">{project.subtitle}</p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {project.description}
          </p>
          {/* --- Reviews Section --- */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-gray-700">Comments</h4>
              <button
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => setShowForm(f => !f)}
              >
                {showForm ? "Cancel" : "Add Comment"}
              </button>
            </div>
            {showForm && (
              <form className="mb-2" onSubmit={handleReviewSubmit}>
                <textarea
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  className="w-full p-2 text-black rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                  rows={2}
                  placeholder="Write your comment..."
                  required
                ></textarea>
                <div className="text-right mt-1">
                  <button
                    type="submit"
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
            <div className="space-y-2">
              {(reviews.length === 0) ? (
                <div className="text-gray-500">No comments yet.</div>
              ) : (
                reviews.map((review, i) => (
                  <div key={i} className="bg-white rounded p-2 border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-800">{review}</div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* --- End Reviews Section --- */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white border-none rounded-lg text-sm cursor-pointer transition-colors hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDialog;