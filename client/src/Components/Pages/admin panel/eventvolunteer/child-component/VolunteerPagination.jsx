import React from 'react';

const VolunteerPagination = ({ 
  currentPage, 
  totalPages, 
  rowsPerPage, 
  totalRows, 
  onPageChange, 
  onRowsPerPageChange 
}) => {
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Previous buttons
    pages.push(
      <button
        key="first"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        «
      </button>
    );
    
    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        ‹
      </button>
    );

    // Page numbers
    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded border ${
            currentPage === i 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > maxVisiblePages) {
      pages.push(<span key="dots" className="px-2">...</span>);
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 mx-1 rounded border ${
            currentPage === totalPages 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-50'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    // Next buttons
    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        ›
      </button>
    );
    
    pages.push(
      <button
        key="last"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        »
      </button>
    );

    return pages;
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="flex items-center">
        <span className="text-sm text-gray-700">Rows per page</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <span className="ml-4 text-sm text-gray-700">
          of {totalRows} rows
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        {renderPagination()}
      </div>
    </div>
  );
};

export default VolunteerPagination;
