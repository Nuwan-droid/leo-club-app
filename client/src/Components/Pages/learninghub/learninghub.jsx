import React from 'react';
import HeroSection from './HeroSection';
import ContentGrid from './ContentGrid';
import Navbar from '../memberportal/memberportalnav';

const LearningHub = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <HeroSection />
      <ContentGrid />
    </div>
  );
};

export default LearningHub;
