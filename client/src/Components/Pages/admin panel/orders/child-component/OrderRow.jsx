import React from 'react';

// Simple status badge component
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {status || 'Unknown'}
    </span>
  );
};

const OrderRow = ({ order }) => {
  // Format date properly
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Format price with currency - MOVED TO CORRECT POSITION
  const formatPrice = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return 'N/A';
    return `Rs ${numAmount.toFixed(2)}`;
  };

  // Get customer name
  const getCustomerName = (customer) => {
    if (!customer) return 'N/A';
    
    const firstName = customer.firstName || customer.first_name || '';
    const lastName = customer.lastName || customer.last_name || '';
    const fullName = customer.name || '';
    
    if (fullName) return fullName;
    if (firstName || lastName) return `${firstName} ${lastName}`.trim();
    return 'N/A';
  };

  // Get customer address
  const getCustomerAddress = (customer) => {
    if (!customer) return 'N/A';
    return customer.address || customer.shipping_address || customer.billing_address || 'N/A';
  };

  // Get items display
  const getItemsDisplay = (items) => {
    if (!Array.isArray(items)) return 'No items';
    if (items.length === 0) return 'No items';
    
    return items.map((item, index) => {
      return item.name || item.product_name || item.title || `Item ${index + 1}`;
    }).join(', ');
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        #{order.order_id || order.id || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {getCustomerName(order.customer)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
        {getCustomerAddress(order.customer)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(order.created_date || order.createdAt)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
        <div className="truncate" title={getItemsDisplay(order.items)}>
          {getItemsDisplay(order.items)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {formatPrice(order.total_amount || order.payment?.amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <StatusBadge status={order.order_status || order.status} />
      </td>
    </tr>
  );
};

export default OrderRow;