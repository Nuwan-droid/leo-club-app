import React from 'react';

const DonationItems = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {Object.entries(items).map(([itemName, quantity]) => (
        <span
          key={itemName}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {itemName}: {quantity}
        </span>
      ))}
    </div>
  );
};

export default DonationItems;
