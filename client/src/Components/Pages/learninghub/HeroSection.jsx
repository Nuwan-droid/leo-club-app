import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="w-full">
          <img
            src="../../../../public/Hero_Image.png"
            alt="Happy children"
            className="w-full h-auto rounded-lg shadow-lg"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
