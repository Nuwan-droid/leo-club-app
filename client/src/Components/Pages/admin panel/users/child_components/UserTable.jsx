import React from 'react';
import UserTableRow from './UserTableRow';

const UserTable = ({ 
  users, 
  selectedUsers, 
  onSelectAll, 
  onSelectUser, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length && users.length > 0}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-gray-300"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              isSelected={selectedUsers.includes(user.id)}
              onSelect={(checked) => onSelectUser(user.id, checked)}
              onEdit={() => onEdit(user.id)}
              onDelete={() => onDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
