import React from 'react';
import ProjectCard from './ProjectCard';

const CompletedProjectsList = ({ projects, onEdit, onDelete, onAddToShowcase }) => {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project}
          onEdit={() => onEdit(project.id)}
          onDelete={() => onDelete(project.id)}
          onAddToShowcase={() => onAddToShowcase(project.id)}
        />
      ))}
    </div>
  );
};

export default CompletedProjectsList;
