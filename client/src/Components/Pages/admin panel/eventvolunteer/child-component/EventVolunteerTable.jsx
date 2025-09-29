import React from 'react';
import VolunteerRow from './VolunteerRow';
import VolunteerPagination from './VolunteerPagination';

const EventVolunteerTable = ({ 
  volunteers, 
  selectedVolunteers, 
  onSelectAll, 
  onSelectVolunteer, 
  onDelete,
  onAddScore,
  onAddContribution,
  currentPage,
  totalPages,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Add Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Add Contribution
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {volunteers.map((volunteer) => (
              <VolunteerRow
                key={volunteer.id}
                volunteer={volunteer}
                isSelected={selectedVolunteers.includes(volunteer.id)}
                onSelect={(checked) => onSelectVolunteer(volunteer.id, checked)}
                onDelete={() => onDelete(volunteer.id)}
                onAddScore={onAddScore}
                onAddContribution={onAddContribution}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <VolunteerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
};

export default EventVolunteerTable;
