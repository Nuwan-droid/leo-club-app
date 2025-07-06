import React from 'react';

const EventDetailsPopup = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative">
          <img 
            src="/api/placeholder/400/300" 
            alt="Seeds for Hope"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seeds for Hope</h2>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Wednesday, June 28</span>
            </p>
            <p className="text-gray-600 mb-4">5:30 PM - 8:30 PM</p>
          </div>

          <div className="mb-6">
            <div className="flex items-start">
              <div className="w-5 h-5 text-gray-400 mr-2 mt-0.5">📍</div>
              <div>
                <p className="font-medium text-gray-900">Nika/wari/ Katupatha M.V.</p>
                <p className="text-gray-600 text-sm">Nikaweratiya, North western province</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-3">
              Welcome! To join this event, please register below.
            </p>
            <div className="flex items-center">
              <img 
                src="/api/placeholder/32/32" 
                alt="Thilina Aakari"
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-sm text-gray-700">Thilina Aakari (thilina2001@gmail.com)</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6">
            Request to Join
          </button>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">About Event</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Seeds for Hope</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">Nika/wari/ Katupatha M.V.</p>
              <p className="text-sm text-gray-600 mb-3">Nikaweratiya, North western province</p>
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map View</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPopup;
