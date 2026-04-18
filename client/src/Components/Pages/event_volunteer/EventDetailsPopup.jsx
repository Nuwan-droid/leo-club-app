// EventDetailsPopup.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, X, Share2, Heart, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventDetailsPopup = ({ event, onClose }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!event) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [event, onClose]);

  useEffect(() => {
    if (!event) return;
    
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event]);

  if (!event) return null;

  const handleJoinRequest = () => {
    setIsLoading(true);
    // Simulate join request (fake)
    setTimeout(() => {
      setIsJoined(true);
      setAttendeeCount(prev => prev + 1);
      toast.success('Join request sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      setIsLoading(false);
    }, 1000); // Simulate 1-second delay
  };

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    toast.success(newIsLiked ? 'Event liked!' : 'Event unliked!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${event.title || event.name} Event`,
        text: 'Join me at this amazing community event!',
        url: window.location.href,
      }).then(() => {
        toast.success('Event shared successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }).catch(() => {
        toast.error('Failed to share event.', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Link copied to clipboard!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }).catch(() => {
        toast.error('Failed to copy link.', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
    }
  };

  const eventDescription = event.description || "Join us for a transformative community initiative focused on sustainable agriculture and environmental conservation. This event brings together passionate individuals to plant seeds of hope for our future generations. Experience hands-on learning, connect with like-minded people, and contribute to meaningful change in our community. Activities include seed planting workshops, environmental education sessions, and collaborative planning for future sustainability projects.";

  const truncatedDescription = eventDescription.slice(0, 150) + "...";

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[95vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
        <div className="relative">
          <img
            src="/event2.png"
            alt={event.title || event.name}
            className="w-full h-56 object-cover"
            onError={() => console.log(`Failed to load popup image for event: ${event.title || event.name}`)}
          />
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
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Registration Open
            </span>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">{event.title || event.name}</h1>
            <p className="text-gray-600 text-sm">{event.type || "Service projects"}</p>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-blue-500" />
              <span className="font-medium">{event.day}, {event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} className="text-blue-500" />
              <span>Starts at {event.time}</span>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <MapPin size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">{event.location}</p>
                <p className="text-gray-600 text-sm">Nikaweratiya, North Western Province</p>
              </div>
            </div>
          </div>
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
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">About This Event</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed text-sm">
                {showFullDescription ? eventDescription : truncatedDescription}
              </p>
              {eventDescription.length > 150 && (
                <button 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-500 font-medium text-sm mt-2 hover:text-blue-600 transition-colors"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
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