import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, hoveredCard, onCardHover, onProjectClick }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No projects found for selected year</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          isHovered={hoveredCard === index}
          onHover={() => onCardHover(index)}
          onLeave={() => onCardHover(null)}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}
