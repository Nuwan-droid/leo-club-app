import React, { useState } from "react";

function Projectcard({ project, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-lg ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img
        src={project.image} 
        alt={project.title}
        className="w-full h-48 object-cover"
      />
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

export default Projectcard;