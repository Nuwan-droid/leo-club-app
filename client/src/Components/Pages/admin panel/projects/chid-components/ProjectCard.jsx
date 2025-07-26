import React from 'react';
import AttendeesList from './AttendeesList';

const ProjectCard = ({ project, onAddToShowcase }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0">
        <img
          src={project.image}
          alt={project.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{project.date}</p>
            <p className="text-sm text-gray-500 mb-1">{project.location}</p>
            <p className="text-sm text-gray-500 mb-3">{project.city}</p>
            
            <div className="flex items-center space-x-2 mb-3">
              <AttendeesList 
                attendees={project.attendees} 
                additionalCount={project.additionalCount}
              />
            </div>

            <button
              onClick={onAddToShowcase}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              + Add to project showcase
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
