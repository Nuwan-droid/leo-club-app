import React, { useState } from 'react';

const DonationRow = ({ donation, getProjectName, onVerify, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Safety check for donation object
  if (!donation) {
    return null;
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
      verified: { color: 'bg-green-100 text-green-800', icon: '✅' },
      rejected: { color: 'bg-red-100 text-red-800', icon: '❌' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <span>{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDonationTypeDisplay = () => {
    if (donation.donation_type === 'project') {
      return (
        <div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            🎯 Project
          </span>
          <div className="text-sm text-gray-600 mt-1">
            {donation.project_id ? getProjectName(donation.project_id) : 'Unknown Project'}
          </div>
        </div>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          🏛️ Club Fund
        </span>
      );
    }
  };

  const getPaymentMethodDisplay = () => {
    if (donation.payment_method === 'online') {
      return (
        <div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            💳 Online
          </span>
          {donation.payment && donation.payment.order_id && (
            <div className="text-xs text-gray-500 mt-1">
              ID: {donation.payment.order_id.slice(-8)}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            📄 Receipt
          </span>
          {donation.receipt && (
            <div className="text-xs text-gray-500 mt-1">
              <a 
                href={`http://localhost:5001/receipts/${typeof donation.receipt === 'string' ? donation.receipt.split(/[/\\]/).pop() : donation.receipt}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View Receipt
              </a>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-150">
        {/* Donor Information */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {donation.donor_name ? donation.donor_name.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {donation.donor_name || 'Anonymous'}
              </div>
              <div className="text-sm text-gray-500">
                {donation.donor_email || 'No email'}
              </div>
              {donation.donor_phone && (
                <div className="text-xs text-gray-500">
                  {donation.donor_phone}
                </div>
              )}
            </div>
          </div>
        </td>

        {/* Type & Project */}
        <td className="px-6 py-4 whitespace-nowrap">
          {getDonationTypeDisplay()}
        </td>

        {/* Amount */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            Rs. {donation.amount ? donation.amount.toLocaleString() : '0'}
          </div>
        </td>

        {/* Payment Method */}
        <td className="px-6 py-4 whitespace-nowrap">
          {getPaymentMethodDisplay()}
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          {getStatusBadge(donation.status)}
        </td>

        {/* Date */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(donation.createdAt)}
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center gap-2">
            {donation.status === 'pending' && (
              <button
                onClick={() => onVerify(donation._id)}
                className="text-green-600 hover:text-green-900 hover:bg-green-50 px-2 py-1 rounded transition-colors duration-150"
                title="Verify Donation"
              >
                ✅
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-150"
              title="View Details"
            >
              👁️
            </button>
            <button
              onClick={() => onDelete(donation._id)}
              className="text-red-600 hover:text-red-900 hover:bg-red-50 px-2 py-1 rounded transition-colors duration-150"
              title="Delete Donation"
            >
              🗑️
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded Details Row */}
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan="7" className="px-6 py-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Donation Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Donation ID:</span>
                  <div className="text-gray-600">{donation._id}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <div className="text-gray-600">{donation.donor_address || 'Not provided'}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">City:</span>
                  <div className="text-gray-600">{donation.donor_city || 'Not provided'}</div>
                </div>
                {donation.payment && (
                  <>
                    <div>
                      <span className="font-medium text-gray-700">Payment ID:</span>
                      <div className="text-gray-600">{donation.payment.order_id || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Payment Status:</span>
                      <div className="text-gray-600">{donation.payment.status}</div>
                    </div>
                  </>
                )}
                <div>
                  <span className="font-medium text-gray-700">Last Updated:</span>
                  <div className="text-gray-600">{formatDate(donation.updatedAt)}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default DonationRow;