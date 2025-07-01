import React, { useState } from 'react';
import ContentCard from './ContentCard';

const ContentGrid = () => {
  const [visibleCards, setVisibleCards] = useState(6);
  
  const contentItems = [
    {
      id: 1,
      date: '11/04/2025',
      title: 'How design a Flyer',
      description: 'Body ',
      image: '../../../../public/flyer_image.jpg'
    },
    {
      id: 2,
      date: '11/04/2025',
      title: 'How write caption for flyer',
      description: 'Body ',
      image: '../../../../public/flyer_image.jpg'
    },
    {
      id: 3,
      date: '11/04/2025',
      title: 'How using AI corectly ',
      description: 'Body ',
      image: '../../../../public/caption_for flyer.jpg'
    },
    {
      id: 4,
      date: '11/04/2025',
      title: 'How design a Flyer',
      description: 'Body ',
      image: '../../../../public/new-idea.jpg'
    },
    {
      id: 5,
      date: '11/04/2025',
      title: 'How design a Flyer',
      description: 'Body',
      image: '../../../../public/Use _AI.jpg'
    },
    {
      id: 6,
      date: '11/04/2025',
      title: 'How design a Flyer',
      description: 'Body ',
      image: '../../../../public/flyer_image.jpg'
    }
  ];

  const loadMore = () => {
    setVisibleCards(prev => Math.min(prev + 3, contentItems.length));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contentItems.slice(0, visibleCards).map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCards < contentItems.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-full p-4 shadow-md hover:shadow-lg"
              aria-label="Load more content"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentGrid;
