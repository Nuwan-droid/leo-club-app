import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, X, ChevronLeft, Share2, Heart, Users } from 'lucide-react';

const EventDetailsPopup = ({ event, onClose }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Close on escape key
  useEffect(() => {
    if (!event) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [event, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (!event) return;
    
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event]);

  if (!event) return null;

  const handleJoinRequest = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsJoined(true);
    setAttendeeCount(prev => prev + 1);
    setIsLoading(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Seeds for Hope Event',
        text: 'Join me at this amazing community event!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const eventDescription = "Join us for a transformative community initiative focused on sustainable agriculture and environmental conservation. This event brings together passionate individuals to plant seeds of hope for our future generations. Experience hands-on learning, connect with like-minded people, and contribute to meaningful change in our community. Activities include seed planting workshops, environmental education sessions, and collaborative planning for future sustainability projects.";

  const truncatedDescription = eventDescription.slice(0, 150) + "...";

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[95vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header with Image */}
        <div className="relative">
          <div className="h-56 bg-blue-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <span className="text-3xl">🌱</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">Seeds for Hope</h1>
              <p className="text-green-100 text-sm"> Environmental Community</p>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={handleShare}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200 hover:scale-110"
            >
              <Share2 size={16} className="text-gray-700" />
            </button>
            <button 
              onClick={handleLike}
              className={`backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={onClose}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200 hover:scale-110"
            >
              <X size={16} className="text-gray-700" />
            </button>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Registration Open
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Date & Time */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-blue-500" />
              <span className="font-medium">Monday, July 28</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} className="text-blue-500" />
              <span>5:30 PM - 8:30 PM</span>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <MapPin size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Nika/wari/ Katupatha M.V.</p>
                <p className="text-gray-600 text-sm">Nikaweratiya, North Western Province</p>
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">{attendeeCount} people interested</p>
                  <p className="text-sm text-gray-600">Join the community</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
                <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-gray-600 text-xs">+{attendeeCount - 4}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organizer */}
          <div className="mb-6">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Organized by Thilina Adikari</p>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <div className="mb-6">
            {!isJoined ? (
              <button 
                onClick={handleJoinRequest}
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-yellow-400 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  'Request to Join Event'
                )}
              </button>
            ) : (
              <div className="w-full py-4 px-6 rounded-xl font-semibold text-green-700 bg-green-100 border-2 border-green-300 text-center">
                ✓ Join Request Sent Successfully
              </div>
            )}
          </div>

          {/* About Event */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">About This Event</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed text-sm">
                {showFullDescription ? eventDescription : truncatedDescription}
              </p>
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-500 font-medium text-sm mt-2 hover:text-blue-600 transition-colors"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Location</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-full h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20"></div>
                <div className="text-center z-10">
                  <MapPin size={32} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">Interactive Map</p>
                  <p className="text-gray-600 text-sm">Tap to view directions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPopup;