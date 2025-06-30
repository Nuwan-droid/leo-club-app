import React from 'react';
import LearningCard from './LearningCard';

const LearningGrid = () => {
  const learningItems = [
    {
      id: 1,
      title: "How design a Flyer",
      description: "Body text for whatever you'd like to add more to the subheading",
      image: "/api/placeholder/300/200",
      date: "11/04/2025"
    },
    {
      id: 2,
      title: "How design a Flyer",
      description: "Body text for whatever you'd like to add more to the subheading",
      image: "/api/placeholder/300/200",
      date: "11/04/2025"
    },
    {
      id: 3,
      title: "How design a Flyer",
      description: "Body text for whatever you'd like to add more to the subheading",
      image: "/api/placeholder/300/200",
      date: "11/04/2025"
    },
    {
      id: 4,
      title: "How design a Flyer",
      description: "Body text for whatever you'd like to add more to the subheading",
      image: "/api/placeholder/300/200",
      date: "11/04/2025"
    },
    {
      id: 5,
      title: "How design a Flyer",
      description: "Body text for whatever you'd like to add more to the subheading",
      image: "/api/placeholder/300/200",
      date: "11/04/2025"
    },
    {
      id: 6,
      title: "How design a Flyer",
      description: "Body text for whatever you'd like to add more to the subheading",
      image: "/api/placeholder/300/200",
      date: "11/04/2025"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {learningItems.map((item) => (
            <LearningCard key={item.id} {...item} />
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full p-4 shadow-md">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningGrid;
