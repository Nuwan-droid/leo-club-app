import React, { useState } from "react";

function ProjectCard({ project, index, onClick, onHeartClick, heartCount = 0, hearted = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-lg relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      {/* Heart icon - bottom right */}
      <button
        className="absolute bottom-3 right-3 z-10 flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1 shadow hover:bg-red-50"
        onClick={e => { e.stopPropagation(); onHeartClick(project); }}
        aria-label="Like project"
      >
        <svg
          className={`w-6 h-6 ${hearted ? "text-red-500" : "text-gray-400"}`}
          fill={hearted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21C12 21 4.5 13.36 4.5 8.75C4.5 6.01 6.71 3.75 9.5 3.75C11.11 3.75 12 5.04 12 5.04C12 5.04 12.89 3.75 14.5 3.75C17.29 3.75 19.5 6.01 19.5 8.75C19.5 13.36 12 21 12 21Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ml-1 text-sm text-gray-700">{heartCount}</span>
      </button>
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">{project.date}</p>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.subtitle}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          {/* Add any additional content here if needed */}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;