import React from 'react';
import StatusBadge from './StatusBadge';
import ActionButtons from './ActionButtons';

const UserTableRow = ({ user, isSelected, onSelect, onEdit, onDelete }) => {
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
              src={user.avatar}
              alt={user.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.username}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.role}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default UserTableRow;
