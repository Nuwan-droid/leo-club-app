import React from 'react';
import DonationProjectCard from './DonationProjectCard';

const DonationProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <DonationProjectCard 
          key={project.id} 
          project={project}
          onEdit={() => onEdit(project.id)}
          onDelete={() => onDelete(project.id)}
        />
      ))}
    </div>
  );
};

export default DonationProjectList;
