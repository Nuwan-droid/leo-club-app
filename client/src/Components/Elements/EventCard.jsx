import { Download } from 'lucide-react';

function EventCard() {
  const event = {
    title: 'Annual Tech Expo 2025',
    date: 'June 10, 2025',
    imageUrl: '/images/tech-expo.jpg', // Replace with your image path
    fileUrl: '/downloads/event-brochure.pdf', // Replace with your file path
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col gap-4">
        <p className="text-gray-500 text-sm text-center">{event.date}</p>
        <a
          href={event.fileUrl}
          download
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
    </div>
  );
}

export default EventCard;
