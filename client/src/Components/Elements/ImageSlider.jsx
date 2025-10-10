import { useState, useEffect } from "react";
import slider1 from '../../assets/LandingImage/slider1.png';
import slider2 from '../../assets/LandingImage/slider2.jpg';
import slider3 from '../../assets/LandingImage/slider3.jpg';


export default function ImageSlider() {
  const images = [
    { src: slider2, alt: 'slider2' },
    { src: slider1, alt: 'slider1' },
    { src: slider3, alt: 'slider3' }
    
  ];

  const [index, setIndex] = useState(0);

 
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

 
  const goToPrevious = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className=" w-[full-100px] h-[800px] m-2 transition-transform duration-500 hover:scale-102 mt-20">
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
