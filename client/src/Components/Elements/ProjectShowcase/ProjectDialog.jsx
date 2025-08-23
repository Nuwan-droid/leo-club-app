import ImageSlider from "./ImageSlider";
import ReviewSection from "./ReviewSection";

export default function ProjectDialog({ project, reviews, onClose, onAddReview, user, token }) {
  return (
    <div className="fixed inset-0 bg-[#000000b0] flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold text-gray-500 shadow-md hover:text-gray-700 z-10"
          >
            ×
          </button>
          <ImageSlider
            images={project.sliderImages?.length ? project.sliderImages : [project.image]}
            alt={project.title}
          />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
            <p>{project.date}</p>
            <span className="flex items-center text-blue-600">
              📍 {project.location}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
          <p className="text-lg text-gray-600 mb-4">{project.subtitle}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

          <ReviewSection
            projectId={project.id}
            reviews={reviews}
            onAddReview={onAddReview}
            user={user}
            token={token}
          />

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}