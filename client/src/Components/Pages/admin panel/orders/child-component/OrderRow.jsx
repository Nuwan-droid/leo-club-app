import React from 'react';

const OrderRow = ({ order }) => {
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

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

  // Get items display with commercial format
  const getItemsDisplay = (items) => {
    if (!Array.isArray(items) || items.length === 0) return 'No items';
    
    return items.map((item, index) => {
      const itemName = item.name || item.product_name || item.title || `Item ${index + 1}`;
      return `${index + 1}. ${itemName}`;
    }).join('\n');
  };

  // Get quantities display
  const getQuantitiesDisplay = (items) => {
    if (!Array.isArray(items) || items.length === 0) return '0';
    
    return items.map((item, index) => {
      const qty = item.quantity || 0;
      return `${index + 1}. Qty: ${qty}`;
    }).join('\n');
  };

  // Get sizes display
  const getSizesDisplay = (items) => {
    if (!Array.isArray(items) || items.length === 0) return '-';
    
    return items.map((item, index) => {
      const size = item.size || '-';
      return `${index + 1}. ${size}`;
    }).join('\n');
  };

  // Get colors display
  const getColorsDisplay = (items) => {
    if (!Array.isArray(items) || items.length === 0) return '-';
    
    return items.map((item, index) => {
      const color = item.color || '-';
      return `${index + 1}. ${color}`;
    }).join('\n');
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        #{order.order_id || order.id || 'N/A'}
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <div className="font-medium">{getCustomerName(order.customer)}</div>
          <div className="text-xs text-gray-500">
            {order.customer?.type === 'member' ? 'Member' : 'Visitor'}
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <div className="font-mono text-xs bg-blue-50 px-2 py-1 rounded border">
            {order.customer?.mobile || 'N/A'}
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <div className="text-xs truncate bg-green-50 px-2 py-1 rounded border" title={order.customer?.email || 'N/A'}>
            {order.customer?.email || 'N/A'}
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <div className="truncate text-xs" title={getCustomerAddress(order.customer)}>
            {getCustomerAddress(order.customer)}
          </div>
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="text-xs">
          {formatDate(order.created_date || order.createdAt)}
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <pre className="whitespace-pre-line text-xs font-mono bg-gray-50 p-2 rounded border">
            {getItemsDisplay(order.items)}
          </pre>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <pre className="whitespace-pre-line text-xs font-mono bg-blue-50 p-2 rounded border text-center">
            {getQuantitiesDisplay(order.items)}
          </pre>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <pre className="whitespace-pre-line text-xs font-mono bg-green-50 p-2 rounded border text-center">
            {getSizesDisplay(order.items)}
          </pre>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">
        <div className="max-w-xs">
          <pre className="whitespace-pre-line text-xs font-mono bg-yellow-50 p-2 rounded border text-center">
            {getColorsDisplay(order.items)}
          </pre>
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="text-right">
          <div className="font-bold text-green-600">
            {formatPrice(order.total_amount || order.payment?.amount)}
          </div>
          <div className="text-xs text-gray-500">
            Total Amount
          </div>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;