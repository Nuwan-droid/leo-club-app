import React from 'react';


const StatsCard = ({ title, value, color = 'blue', icon }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses[color] || colorClasses.blue}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className="text-2xl opacity-50">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

const OrderStats = ({ stats }) => {
  
  const safeStats = {
    totalOrders: 0,
    completedOrders: 0,
    processingOrders: 0,
    totalRevenue: 0,
    ...stats
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title="Total Orders"
        value={safeStats.totalOrders}
        color="blue"
        icon="📋"
      />
      <StatsCard
        title="Completed"
        value={safeStats.completedOrders}
        color="green"
        icon="✅"
      />
      <StatsCard
        title="Processing"
        value={safeStats.processingOrders}
        color="purple"
        icon="⏳"
      />
      <StatsCard
        title="Total Revenue"
        value={`Rs ${safeStats.totalRevenue.toFixed(2)}`}
        color="yellow"
        icon="💰"
      />
    </div>
  );
};

export default OrderStats;