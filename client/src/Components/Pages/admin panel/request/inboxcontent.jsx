import React, { useState } from 'react';
import MessageItem from './massageitem';

const InboxContent = ({ selectedMessages, setSelectedMessages }) => {
  const [messages] = useState([
    {
      id: 1,
      sender: 'Jullu Jalal',
      badge: 'Member',
      badgeColor: 'bg-teal-100 text-teal-800',
      subject: 'Our Bachelor of Commerce program is ACBSP-accredited.',
      time: '8:38 AM'
    },
    {
      id: 2,
      sender: 'Minerva Barnett',
      badge: 'Event Volunteer',
      badgeColor: 'bg-orange-100 text-orange-800',
      subject: 'Get Best Advertiser In Your Side Pocket',
      time: '8:13 AM'
    },
    {
      id: 3,
      sender: 'Peter Lewis',
      badge: 'Member',
      badgeColor: 'bg-teal-100 text-teal-800',
      subject: 'Vacation Home Rental Success',
      time: '7:52 PM'
    },
    {
      id: 4,
      sender: 'Anthony Briggs',
      badge: 'Member',
      badgeColor: 'bg-teal-100 text-teal-800',
      subject: 'Free Classifieds Using Them To Promote Your Stuff Online',
      time: '7:52 PM'
    },
    {
      id: 5,
      sender: 'Clifford Morgan',
      badge: 'Member',
      badgeColor: 'bg-teal-100 text-teal-800',
      subject: 'Enhance Your Brand Potential With Giant Advertising Blimps',
      time: '4:13 PM'
    },
    {
      id: 6,
      sender: 'Cecilia Webster',
      badge: 'Event Volunteer',
      badgeColor: 'bg-orange-100 text-orange-800',
      subject: 'Always Look On The Bright Side Of Life',
      time: '3:52 PM'
    }
  ]);

  const handleSelectMessage = (messageId) => {
    setSelectedMessages(prev => {
      if (prev.includes(messageId)) {
        return prev.filter(id => id !== messageId);
      } else {
        return [...prev, messageId];
      }
    });
  };

  const handleDeleteSelected = () => {
   
    console.log('Deleting messages:', selectedMessages);
    setSelectedMessages([]);
  };

  return (
    <div className="flex-1 bg-white">
      <div className="p-6">
        {selectedMessages.length > 0 && (
          <div className="mb-4 flex gap-2">
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Delete Selected ({selectedMessages.length})
            </button>
            <button
              onClick={() => setSelectedMessages([])}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        )}
        
        <div className="space-y-1">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isSelected={selectedMessages.includes(message.id)}
              onSelect={handleSelectMessage}
            />
          ))}
        </div>
        
        <div className="mt-6 text-sm text-gray-500 text-center">
          Showing 1-12 of 1,253
        </div>
      </div>
    </div>
  );
};

export default InboxContent;
