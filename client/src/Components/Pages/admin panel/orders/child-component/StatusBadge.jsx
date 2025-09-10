import React from 'react';

const StatusBadgeBox = ({ 
  color, 
  icon, 
  label, 
  value, 
  onClick, 
  isActive = false,
  filterType 
}) => {
  const handleClick = () => {
    if (onClick && filterType) {
      onClick(filterType);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105 ${
        isActive ? 'ring-2 ring-blue-500 bg-blue-50' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
            <dd className="text-2xl font-bold text-gray-900">{value}</dd>
          </dl>
        </div>
        {isActive && (
          <div className="ml-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadgeBoxes = ({ 
  stats, 
  onFilterChange, 
  activeFilter = 'all' 
}) => {
  // Default values to prevent crash if stats is undefined
  const safeStats = stats || {
    totalOrders: 0,
    completedOrders: 0,
    processingOrders: 0,
    totalRevenue: 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatusBadgeBox
        color="bg-blue-500"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
        label="Total Orders"
        value={safeStats.totalOrders}
        onClick={onFilterChange}
        isActive={activeFilter === 'all'}
        filterType="all"
      />
      <StatusBadgeBox
        color="bg-green-500"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        label="Completed Orders"
        value={safeStats.completedOrders}
        onClick={onFilterChange}
        isActive={activeFilter === 'completed'}
        filterType="completed"
      />
      <StatusBadgeBox
        color="bg-purple-500"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        label="Processing Orders"
        value={safeStats.processingOrders}
        onClick={onFilterChange}
        isActive={activeFilter === 'processing'}
        filterType="processing"
      />
      <StatusBadgeBox
        color="bg-yellow-500"
        icon={
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        label="Total Revenue"
        value={`Rs ${safeStats.totalRevenue?.toFixed(2) ?? '0.00'}`}
        onClick={() => {}} // Revenue card doesn't filter
        isActive={false}
        filterType="revenue"
      />
    </div>
  );
};

export default StatusBadgeBoxes;