import React from 'react';

const DonationFilters = ({ filters, setFilters, onRefresh }) => {
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        
        {/* Donation Type Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="donationType" className="text-sm font-medium text-gray-700">
            Type:
          </label>
          <select
            id="donationType"
            value={filters.donationType}
            onChange={(e) => handleFilterChange('donationType', e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="project">Project Donations</option>
            <option value="club_fund">Club Fund Donations</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="dateRange" className="text-sm font-medium text-gray-700">
            Date:
          </label>
          <select
            id="dateRange"
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default DonationFilters;