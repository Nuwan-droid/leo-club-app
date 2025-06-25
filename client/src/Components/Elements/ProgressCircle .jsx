import React from 'react';

const ProgressCircle = ({ score = 0, maxScore = 100, size = 24 }) => {
  // Calculate percentage
  const percentage = Math.min((score / maxScore) * 100, 100);
  
  // Calculate stroke dash array for the progress circle
  const radius = (size * 4) / 2.4; // Adjust radius based on size
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  // Determine color based on score percentage
  const getProgressColor = (percent) => {
    if (percent >= 80) return '#10b981'; // Green for excellent
    if (percent >= 60) return '#3b82f6'; // Blue for good
    if (percent >= 40) return '#f59e0b'; // Yellow for average
    return '#ef4444'; // Red for needs improvement
  };

  const progressColor = getProgressColor(percentage);

  return (
    <div className={`relative w-${size} h-${size}`}>
      <svg className={`w-${size} h-${size} transform -rotate-90`}>
        {/* Background circle */}
        <circle
          cx={size * 2}
          cy={size * 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size * 2}
          cy={size * 2}
          r={radius}
          stroke={progressColor}
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dasharray 0.5s ease-in-out'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-900">{score}</span>
          <div className="text-xs text-gray-500">/{maxScore}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
