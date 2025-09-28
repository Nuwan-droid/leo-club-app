// child_components/UserTable.jsx
import React from "react";
import UserTableRow from "./UserTableRow";

const UserTable = ({
  users,
  selectedUsers,
  onSelectAll,
  onSelectUser,
  onToggleActive,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserTableRow
              key={user.tableId || user._id}
              user={user}
              isSelected={selectedUsers.includes(user.tableId || String(user._id))}
              onSelect={(checked) => onSelectUser(user.tableId || String(user._id), checked)}
              onToggleActive={onToggleActive}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;