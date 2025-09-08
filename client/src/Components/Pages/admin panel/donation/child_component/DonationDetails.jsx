import React, { useState, useEffect } from 'react';

const DonationDetails = ({ projectId, projectTitle, onClose }) => {
  const [donationItems, setDonationItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStats, setTotalStats] = useState({
    totalDonations: 0,
    totalBooks: 0,
    totalPens: 0,
    totalClothes: 0,
    totalDonors: 0
  });

  useEffect(() => {
    if (projectId) {
      fetchDonationItems();
    }
  }, [projectId]);

  const fetchDonationItems = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await fetch(`http://localhost:5001/api/donation-projects/items/${projectId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();

      if (result.success) {
        setDonationItems(result.data);
        
        // Calculate totals
        const stats = result.data.reduce((acc, donation) => {
          acc.totalDonations += 1;
          acc.totalBooks += donation.donated_items.books || 0;
          acc.totalPens += donation.donated_items.pens || 0;
          acc.totalClothes += donation.donated_items.clothes || 0;
          return acc;
        }, { totalDonations: 0, totalBooks: 0, totalPens: 0, totalClothes: 0 });
        
        stats.totalDonors = new Set(result.data.map(d => d.donor_info.email)).size;
        setTotalStats(stats);
      } else {
        setError(result.message || 'Failed to fetch donation items');
      }
    } catch (err) {
      console.error('Error fetching donation items:', err);
      if (err.message.includes('404')) {
        setError('Project not found. Please check if the project exists.');
      } else if (err.message.includes('500')) {
        setError('Server error occurred. Please try again later.');
      } else {
        setError(`Failed to load donation details: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'received': 'bg-green-100 text-green-800',
      'distributed': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const updateDonationStatus = async (donationId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/donation-projects/items/${donationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();
      if (result.success) {
        // Refresh the donation items
        fetchDonationItems();
      } else {
        alert('Failed to update status: ' + result.message);
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading donation details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Donation Details</h2>
            <p className="text-lg text-gray-600 mt-1">{projectTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{totalStats.totalDonations}</div>
            <div className="text-sm text-blue-800">Total Donations</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{totalStats.totalDonors}</div>
            <div className="text-sm text-green-800">Unique Donors</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{totalStats.totalBooks}</div>
            <div className="text-sm text-purple-800">Books Donated</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{totalStats.totalPens}</div>
            <div className="text-sm text-orange-800">Pens Donated</div>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-pink-600">{totalStats.totalClothes}</div>
            <div className="text-sm text-pink-800">Clothes Donated</div>
          </div>
        </div>

        {/* Donations Table */}
        {donationItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No donations received for this project yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donation ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor Information
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Donated
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donationItems.map((donation) => (
                  <tr key={donation._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {donation.donation_id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {donation.donor_info.first_name} {donation.donor_info.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {donation.donor_info.city}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {donation.donated_items.books > 0 && <span className="mr-2">📚 {donation.donated_items.books}</span>}
                        {donation.donated_items.pens > 0 && <span className="mr-2">✏️ {donation.donated_items.pens}</span>}
                        {donation.donated_items.clothes > 0 && <span className="mr-2">👕 {donation.donated_items.clothes}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{donation.donor_info.phone}</div>
                      <div className="text-sm text-gray-500">{donation.donor_info.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(donation.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={donation.status}
                        onChange={(e) => updateDonationStatus(donation._id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="received">Received</option>
                        <option value="distributed">Distributed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Notes Section */}
        {donationItems.some(d => d.notes) && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Notes</h3>
            <div className="space-y-3">
              {donationItems.filter(d => d.notes).map(donation => (
                <div key={donation._id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-gray-900">
                        {donation.donor_info.first_name} {donation.donor_info.last_name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">({donation.donation_id})</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{donation.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
