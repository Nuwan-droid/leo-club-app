import React from 'react';
import MemberRow from './MemberRow';

const ExecutiveCommitteeTable = ({ members, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Phone number
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
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              onEdit={() => onEdit(member.id)}
              onDelete={() => onDelete(member.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExecutiveCommitteeTable;
