import React from 'react';

const ProductStats = ({ products }) => {
  const totalValue = products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);
  const onSaleCount = products.filter(p => p.badge?.toLowerCase() === 'sale').length;
  const outOfStockCount = products.filter(p => parseFloat(p.price || 0) <= 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M20 6H4v12h16V6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Products</p>
          <p className="text-xl font-semibold">{products.length}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <div className="bg-green-100 text-green-600 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M12 8c-1.1 0-2 .9-2 2v4h2v-4h2v-2h-2z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Value</p>
          <p className="text-xl font-semibold">
            Rs.{' '}
            {new Intl.NumberFormat('en-LK', { maximumFractionDigits: 2 }).format(totalValue)}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <div className="bg-orange-100 text-orange-600 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">On Sale</p>
          <p className="text-xl font-semibold">{onSaleCount}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <div className="bg-red-100 text-red-600 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Out of Stock</p>
          <p className="text-xl font-semibold">{outOfStockCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductStats;
