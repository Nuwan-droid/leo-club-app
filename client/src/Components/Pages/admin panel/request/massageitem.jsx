import React from 'react';

const MessageItem = ({ message, isSelected, onSelect }) => {
  return (
    <div className={`flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 ${
      isSelected ? 'bg-blue-50 border-blue-200' : ''
    }`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(message.id)}
        className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="font-medium text-gray-900">
            {message.sender}
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${message.badgeColor}`}>
            {message.badge}
          </span>
          <div className="text-gray-600 flex-1">
            {message.subject}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
