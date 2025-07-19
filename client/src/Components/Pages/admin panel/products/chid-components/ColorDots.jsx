import React from 'react';

const ColorDots = ({ colors }) => {
  const getColorClass = (color) => {
    const colorMap = {
      black: 'bg-black',
      white: 'bg-white border-2 border-gray-300',
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      gray: 'bg-gray-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
      navy: 'bg-blue-900'
    };
    return colorMap[color.toLowerCase()] || 'bg-gray-400';
  };

  return (
    <div className="flex space-x-1">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full ${getColorClass(color)}`}
          title={color}
        />
      ))}
    </div>
  );
};

export default ColorDots;
