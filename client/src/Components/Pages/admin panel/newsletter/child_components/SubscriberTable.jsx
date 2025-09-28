import React from 'react';
import SubscriberRow from './SubscriberRow';
import NewsletterPagination from './NewsletterPagination';

const SubscriberTable = ({ 
  subscribers, 
  selectedSubscribers, 
  onSelectAll, 
  onSelectSubscriber, 
  
  onAddScore,
  onAddSubmission,
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
                <input
                  type="checkbox"
                  checked={selectedSubscribers.length === subscribers.length && subscribers.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Full Name & Score
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
                Add Submission
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscribers.map((subscriber) => (
              <SubscriberRow
                key={subscriber.id}
                subscriber={subscriber}
                isSelected={selectedSubscribers.includes(subscriber.id)}
                onSelect={(checked) => onSelectSubscriber(subscriber.id, checked)}
                onAddScore={onAddScore}
                onAddSubmission={onAddSubmission}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <NewsletterPagination
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

export default SubscriberTable;
