import React, { useState, useEffect } from 'react';
import ProgressCircle from '../../Elements/ProgressCircle ';

const ProfileSection = () => {
  const [userScore, setUserScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user score from API
  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user/score');
        // const data = await response.json();
        
        // Simulated data - replace with actual API response
        const simulatedData = {
          currentScore: 75,
          maxPossibleScore: 100,
          contributions: [
            { type: 'Newsletter', points: 2 },
            { type: 'Events', points: 5},
            { type: 'Volunteering', points: 7 }
          ]
        };
        
        setUserScore(simulatedData.currentScore);
        setMaxScore(simulatedData.maxPossibleScore);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user score:', error);
        setLoading(false);
      }
    };

    fetchUserScore();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
          <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img 
              src="../../../../public/profile.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Welcome, A.M.T.S. Adikari...!</h2>
            <p className="text-gray-500 text-sm">Volunteer</p>
          </div>
        </div>
        <div className="flex items-center">
          <ProgressCircle 
            score={userScore} 
            maxScore={maxScore} 
            size={24} 
          />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-blue-600">5</div>
            <div className="text-xs text-gray-500">Newsletter</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">3</div>
            <div className="text-xs text-gray-500">Events</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-purple-600">10</div>
            <div className="text-xs text-gray-500">Volunteering</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;