import React from 'react';
import DonationRow from './DonationRow';
import DonationPagination from './DonationPagination';

const DonationTable = ({ 
  donations, 
  projects, 
  getProjectName, 
  onVerify, 
  onDelete, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  console.log('🏷️ DonationTable received:', {
    donations: donations?.length || 0,
    projects: projects?.length || 0,
    currentPage,
    totalPages
  });

  if (donations.length === 0) {
    console.log('📝 DonationTable: No donations to display');
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
          <p className="text-gray-500">No donations match your current filters.</p>
        </div>
      </div>
    );
  }

  console.log('🏷️ DonationTable: Rendering table with', donations.length, 'donations');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Donation Records</h3>
        <p className="text-sm text-gray-600">Showing {donations.length} donation(s)</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor Information
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.map((donation) => (
              <DonationRow
                key={donation._id}
                donation={donation}
                getProjectName={getProjectName}
                onVerify={onVerify}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <DonationPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default DonationTable;