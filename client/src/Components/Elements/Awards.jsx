import { Trophy } from 'lucide-react'; // Optional: Lucide icon

function Awards() {
  const awards = [
    {
      title: 'Best Community Impact Award',
      year: '2023',
      description: 'Recognized for outstanding contributions to local education initiatives.',
    },
    {
      title: 'Sustainability Leadership Prize',
      year: '2022',
      description: 'Awarded for leading impactful environmental awareness campaigns.',
    },
    {
      title: 'Youth Leadership Excellence',
      year: '2021',
      description: 'Honored for empowering youth through innovative leadership programs.',
    },
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-16">
      <h2 className="text-4xl font-extrabold text-center text-black mb-8">
        CLUB AWARDS
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {awards.map((award, index) => (
          <div
            key={index}
            className="bg-[#F4F7FF] rounded-2xl shadow-lg p-6 flex flex-col items-start gap-3 hover:shadow-xl transition-shadow"
          >
            <Trophy className="text-blue-600 w-8 h-8" />
            <h3 className="text-xl font-bold text-black">{award.title}</h3>
            <p className="text-sm text-gray-600 font-semibold">{award.year}</p>
            <p className="text-black text-justify">{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Awards;
