import React from 'react';

const DonationStats = ({ stats }) => {
  // Safety check for stats object
  if (!stats) {
    return null;
  }

  const statCards = [
    {
      title: 'Total Donations',
      value: stats.total || 0,
      icon: '📊',
      color: 'blue'
    },
    {
      title: 'Total Amount',
      value: `Rs. ${(stats.totalAmount || 0).toLocaleString()}`,
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Verified',
      value: stats.verified || 0,
      icon: '✅',
      color: 'emerald'
    },
    {
      title: 'Pending',
      value: stats.pending || 0,
      icon: '⏳',
      color: 'yellow'
    },
    {
      title: 'Project Donations',
      value: stats.projectDonations || 0,
      icon: '🎯',
      color: 'purple'
    },
    {
      title: 'Club Fund Donations',
      value: stats.clubFundDonations || 0,
      icon: '🏛️',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className={`p-4 rounded-lg border-2 ${getColorClasses(stat.color)} transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-75">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationStats;