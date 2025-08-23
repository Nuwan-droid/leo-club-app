export default function ProjectCard({ project, isHovered, onHover, onLeave, onClick }) {
  return (
    <div
      className={`cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg ${
        isHovered ? "transform scale-105" : ""
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{project.date}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.title}</h3>
        <p className="text-sm text-gray-600">{project.subtitle}</p>
        {project.commentCount > 0 && (
          <div className="flex items-center mt-2 text-xs text-gray-600">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {project.commentCount} comment{project.commentCount !== 1 && "s"}
          </div>
        )}
      </div>
    </div>
  );
}
