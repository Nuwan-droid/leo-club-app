import React from 'react';
import OrderRow from './OrderRow';

// Professional Pagination Component
const OrderPagination = ({
  currentPage,
  totalPages,
  totalOrders,
  ordersPerPage,
  onPageChange
}) => {
  const startOrder = (currentPage - 1) * ordersPerPage + 1;
  const endOrder = Math.min(currentPage * ordersPerPage, totalOrders);

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate range of pages to show
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      {/* Mobile pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Desktop pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startOrder}</span> to{' '}
            <span className="font-medium">{endOrder}</span> of{' '}
            <span className="font-medium">{totalOrders}</span> orders
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* Previous button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-1">Previous</span>
            </button>

            {/* Page numbers */}
            {getVisiblePages().map((page, index) => (
              page === '...' ? (
                <span
                  key={`dots-${index}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === page
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            ))}

            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="mr-1">Next</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const OrderTable = ({ orders, adminView = false }) => {
  // IMPORTANT: Move all hooks to the top, before any conditional returns
  const [currentPage, setCurrentPage] = React.useState(1);
  const ordersPerPage = 10;

  // Reset to page 1 when orders change (when filters are applied)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [orders.length]);

  // Early return AFTER all hooks have been declared
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

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of table
      const tableElement = document.querySelector('.order-table-container');
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="order-table-container">
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
            {currentOrders.map((order, index) => (
              <OrderRow
                key={order._id || order.id || order.order_id || index}
                order={order}
                adminView={adminView}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <OrderPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalOrders={orders.length}
        ordersPerPage={ordersPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrderTable;