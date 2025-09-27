import React from 'react';
import OrderRow from './OrderRow';

const OrderPagination = ({
  currentPage,
  totalPages,
  totalRows,
  onPageChange
}) => {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span> ({totalRows} total orders)
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              {currentPage}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const OrderTable = ({
  orders,
  currentPage,
  totalPages,
  rowsPerPage,
  totalRows,
  onPageChange,
  adminView = false
}) => {
 
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-8 text-center">
          <div className="text-gray-500 text-lg mb-2">No orders found</div>
          <div className="text-gray-400 text-sm">Orders will appear here when they are created.</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-20">
                Order ID
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-28">
                Customer Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-24">
                Mobile
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-32">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-32">
                Address
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-20">
                Order Date
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-40">
                Items
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-16">
                Quantity
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-16">
                Sizes
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-16">
                Colors
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-20">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <OrderRow
                key={order._id || order.id || order.order_id || index}
                order={order}
                adminView={adminView}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRows={totalRows}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default OrderTable;