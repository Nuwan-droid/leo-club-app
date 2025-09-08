import React from 'react';
import DonationProjectCard from './DonationProjectCard';

const DonationProjectList = ({ projects, onEdit, onDelete, onViewDonations }) => {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <DonationProjectCard 
          key={project.id} 
          project={project}
          onEdit={() => onEdit(project.id)}
          onDelete={() => onDelete(project.id)}
          onViewDonations={() => onViewDonations(project.id, project.name)}
        />
      ))}
    </div>
  );
};

export default DonationProjectList;
