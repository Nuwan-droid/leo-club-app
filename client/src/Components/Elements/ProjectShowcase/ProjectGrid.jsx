import React, { useState } from "react";
import ProjectCard from "./Projectcard";

function ProjectGrid({ projects, onProjectClick }) {
  return (
    <>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No projects found for this year</p>
        </div>
      )}
    </>
  );
}

export default ProjectGrid;