import React from 'react';

const VolunteerRow = ({ volunteer, isSelected, onSelect, onAddScore, onAddContribution }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="rounded border-gray-300"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={volunteer.avatar}
              alt={volunteer.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {volunteer.name}
            </div>
            <div className="text-xs text-gray-500">
              Current Score: {volunteer.score || 0}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {volunteer.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {volunteer.username}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {volunteer.role}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onAddScore(volunteer)}
          className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
          title="Add Score"
        >
          +
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onAddContribution(volunteer)}
          className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          title="Add Contribution"
        >
          +
        </button>
      </td>
    </tr>
  );
};

export default VolunteerRow;
