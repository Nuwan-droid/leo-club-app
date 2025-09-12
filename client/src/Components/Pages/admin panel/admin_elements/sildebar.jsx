import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoImage from '../../../../assets/admin/leo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Request', path: '/admin/request' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Event Calendar', path: '/admin/eventCalendar' },
    { name: 'Newsletters', path: '/admin/newsletters' },
    { name: 'Learning Hub', path: '/admin/learning-hub' },
    { name: 'Event Volunteer', path: '/admin/event-volunteer' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Donation', path: '/admin/donation' },
    { name: 'Manage about', path: '/admin/manage-executive-members' }
 
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-4 flex flex-col items-center justify-center">
        <img 
          src={LogoImage} 
          alt="Logo" 
          className="h-10 w-15 filter invert"
        />
        <h1>LEO Admin</h1> 
        <hr className="w-full border-gray-600 mt-4" />
      </div>
      
      <nav className="flex-1 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleNavigation(tab.path)}
            className={`w-full text-left px-4 py-3 mb-1 rounded-lg transition-colors ${
              location.pathname === tab.path
                ? 'bg-white text-slate-800 font-medium'
                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
