import { useState, useEffect } from "react";
import child from '../../assets/child.jpeg';
import donate from '../../assets/donate.jpeg';
import girl from '../../assets/girl.jpeg';
import image1 from '../../assets/image1.jpeg';

export default function ImageSlider() {
  const images = [
    { src: child, alt: 'Child' },
    { src: donate, alt: 'Donate' },
    { src: girl, alt: 'Girl' },
    { src: image1, alt: 'Image 1' }
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Manual slide control
  const goToPrevious = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
  <div className="relative w-[full-100px] h-[700px] m-2 transition-transform duration-500 hover:scale-102">
  <img
    src={images[index].src}
    alt={images[index].alt}
    className="w-full h-full object-cover duration-500 rounded-sm "
  />


      {/* Left Button */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2  bg-opacity-70 hover:bg-opacity-90 text-gray-800 px-3 py-2 rounded-full shadow-md"
      >
        ◀
      </button>

      {/* Right Button */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-70 hover:bg-opacity-90 text-gray-800 px-3 py-2 rounded-full shadow-md"
      >
        ▶
      </button>
    </div>
  );
}
