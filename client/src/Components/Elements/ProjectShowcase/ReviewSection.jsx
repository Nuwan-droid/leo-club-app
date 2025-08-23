import { useState } from "react";

export default function ReviewSection({ projectId, reviews, onAddReview, user, token }) {
  const [newReview, setNewReview] = useState({ comment: '' });
  const [showAddReview, setShowAddReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (newReview.comment.trim()) {
      setIsSubmitting(true);
      const review = {
        comment: newReview.comment.trim(),
      };

      await onAddReview(projectId, review);
      setNewReview({ comment: '' });
      setShowAddReview(false);
      setIsSubmitting(false);
    }
  };

  const isAuthenticated = user && token;

  return (
    <div className="border-t border-gray-200 pt-6 text-black">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Comments ({reviews.length})</h4>
        
        {isAuthenticated ? (
          <button
            onClick={() => setShowAddReview(!showAddReview)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              showAddReview
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {showAddReview ? "Cancel" : "Add Comment"}
          </button>
        ) : (
          <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
            Please login to add a comment
          </div>
        )}
      </div>

      {showAddReview && isAuthenticated && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Commenting as: <span className="text-blue-600 font-semibold">
                  {user.role === 'admin' 
                    ? (user.name || `${user.firstName} ${user.lastName}`)
                    : `${user.firstName} ${user.lastName}`
                  }
                </span>
              </span>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Share your thoughts about this project..."
            />
          </div>

          <button
            onClick={handleSubmitReview}
            disabled={isSubmitting || !newReview.comment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No comments yet. {isAuthenticated ? "Be the first to comment on this project!" : "Login to be the first to comment!"}
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{review.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}