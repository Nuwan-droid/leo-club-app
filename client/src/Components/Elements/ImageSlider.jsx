
import { useState, useEffect } from "react";

export default function ImageSlider() {
  const images = [
    "https://source.unsplash.com/800x400/?nature",
    "https://source.unsplash.com/800x400/?water",
    "https://source.unsplash.com/800x400/?forest"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(timer); // clean up
  }, [images.length]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        className="w-full h-64 object-cover rounded-lg shadow-md transition duration-500"
      />
    </div>
  );
}
