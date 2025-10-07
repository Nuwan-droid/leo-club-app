import React, { useState } from 'react';
import ContentCard from './ContentCard';

const ContentGrid = () => {
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const contentItems = [
    {
      id: '68da2d627d665ef63aca5da7',
      title: 'How to Design a Flyer',
      description: 'A Practical Guide for Leo Members',
      type: 'pdf',
      image: '/Flyer_image.jpg',
      sourceFile: '/Flyer.pdf'
    },
    {
      id: '68da2d6e7d665ef63aca5da9',
      title: 'How to Use AI Correctly',
      description: 'A Practical Guide for Leo Members',
      type: 'pdf',
      image: '/AI _image.jpg',
      sourceFile: '/AI.pdf'
    },
    {
      id: '68da2d787d665ef63aca5dab',
      title: 'How to Write Captions for a Flyer',
      description: 'A Practical Guide for Leo Members',
      type: 'pdf',
      image: "/Captions_image.jpg",
      sourceFile: '/Captions.pdf'
    }
  ];

  const loadMore = () => {
    setVisibleCards(prev => Math.min(prev + 3, contentItems.length));
  };

  const openPdfViewer = (sourceFile, event) => {
    event.stopPropagation(); // Prevent event bubbling
    console.log('Opening PDF:', sourceFile); // Debugging log
    if (sourceFile) {
      setSelectedPdf(sourceFile);
    } else {
      console.error('Invalid PDF source:', sourceFile);
    }
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contentItems.slice(0, visibleCards).map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
            >
              <div
                onClick={(e) => item.type === 'pdf' && openPdfViewer(item.sourceFile, e)}
                className="cursor-pointer"
              >
                <ContentCard {...item} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm font-semibold">
                    Click to view PDF
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCards < contentItems.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 rounded-full px-6 py-3 shadow-md hover:shadow-lg font-semibold"
              aria-label="Load more content"
            >
              Load More
            </button>
          </div>
        )}

        {/* PDF Viewer Modal */}
        {selectedPdf && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
              <button
                onClick={closePdfViewer}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10"
                aria-label="Close PDF viewer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe
                src={selectedPdf}
                className="w-full h-full rounded-lg"
                title="PDF Viewer"
                onError={(e) => console.error('PDF loading error:', e)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentGrid;