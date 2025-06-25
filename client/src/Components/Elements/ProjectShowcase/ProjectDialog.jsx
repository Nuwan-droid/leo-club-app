import React from "react";
import ImageSlider from "./ImageSlider";

function ProjectDialog({ project, isOpen, onClose, sliderImages = [] }) {
  if (!isOpen || !project) return null;

  // Use provided slider images or fallback to just the project image
  const imagesToShow = sliderImages.length > 0 ? [project.image, ...sliderImages] : [project.image];

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