import React from 'react';
import AttendeesList from './AttendeesList';
import DonationItems from './DonationItems';

const DonationProjectCard = ({ project, onEdit, onDelete, onViewDonations }) => {
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
            <p className="text-sm text-gray-600 mb-1">{project.startDate}</p>
            <p className="text-sm text-gray-500 mb-1">{project.location}</p>
            <p className="text-sm text-gray-500 mb-3">{project.city}</p>
            
            <DonationItems items={project.items} />
            
            <div className="mt-3">
              <AttendeesList 
                attendees={project.attendees} 
                additionalCount={project.additionalCount}
              />
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={onViewDonations}
              className="text-green-600 hover:text-green-900 p-1"
              title="View Donations"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </button>
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-900 p-1"
              title="Edit Project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-900 p-1"
              title="Delete Project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationProjectCard;
