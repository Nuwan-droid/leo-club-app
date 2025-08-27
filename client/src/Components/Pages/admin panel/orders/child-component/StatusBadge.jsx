import React, { useState } from 'react';

const StatusBadge = ({ status, onStatusChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'Processing':
        return 'bg-purple-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(status)} cursor-pointer hover:opacity-80`}
      >
        {status}
        <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {['Completed', 'Processing', 'Pending', 'Cancelled'].map((statusOption) => (
              <button
                key={statusOption}
                onClick={() => handleStatusChange(statusOption)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  status === statusOption ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                {statusOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
