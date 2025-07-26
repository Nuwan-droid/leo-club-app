import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 text-white';
      case 'Inactive':
        return 'bg-gray-500 text-white';
      case 'Banned':
        return 'bg-red-500 text-white';
      case 'Pending':
        return 'bg-blue-800 text-white';
      case 'Suspended':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

