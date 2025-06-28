import React from 'react';

const EventVolunteeringSection = () => {
  const events = [
    {
      id: 1,
      name: 'Snehashka',
      role: 'Project Chair',
      committee: 'Organizing committee',
      status: 'Participating',
      image: '/api/placeholder/80/60'
    },
    {
      id: 2,
      name: 'Snehashka',
      role: 'Project Chair',
      committee: 'Organizing committee',
      status: 'Participating',
      image: '/api/placeholder/80/60'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Volunteering</h3>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-16 h-12 object-cover rounded-md"
              />
              <div>
                <h4 className="font-medium text-gray-900">{event.name}</h4>
                <p className="text-sm text-gray-600">{event.role}</p>
                <p className="text-sm text-gray-500">{event.committee}</p>
                <p className="text-sm text-gray-500">{event.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventVolunteeringSection;

