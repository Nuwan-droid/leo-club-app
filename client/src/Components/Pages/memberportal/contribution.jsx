import React from 'react';

const ContributionSection = () => {
  const submissions = [
    {
      id: 1,
      type: 'SITHUM DEVA',
      image: '/api/placeholder/150/200',
      title: 'Profile Submission'
    },
    {
      id: 2,
      type: 'SITHLUM DOHADA',
      image: '/api/placeholder/150/200',
      title: 'Newsletter Content'
    },
    {
      id: 3,
      type: 'ARTICLES',
      image: '/api/placeholder/150/200',
      title: 'Article Submission'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">My Contribution</h3>
        
      </div>
      
      <h4 className="text-md font-medium text-gray-800 mb-4">News Letter submissions</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
            <div className="aspect-w-3 aspect-h-4 mb-3">
              <img 
                src={submission.image} 
                alt={submission.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <p className="text-sm font-medium text-gray-700">{submission.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionSection;
