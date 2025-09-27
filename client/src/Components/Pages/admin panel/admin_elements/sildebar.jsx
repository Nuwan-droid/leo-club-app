import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LogoImage from '../../../../assets/admin/leo.png';

const permissionToTabMap = {
  dashboard: { name: 'Dashboard', path: '/admin' },
  users_management: { name: 'Users', path: '/admin/users' },
  requests_management: { name: 'Request', path: '/admin/request' },
  projects_management: { name: 'Projects', path: '/admin/projects' },
  event_coordinator: { name: 'Event Calendar', path: '/admin/eventCalendar' },
  newsletters_management: { name: 'Newsletters', path: '/admin/newsletters' },
  learning_hub: { name: 'Learning Hub', path: '/admin/learning-hub' },
  event_volunteers: { name: 'Event Volunteer', path: '/admin/event-volunteer' },
  products_management: { name: 'Products', path: '/admin/products' },
  orders_management: { name: 'Orders', path: '/admin/orders' },
  donations_management: { name: 'Donation', path: '/admin/donation' },
  manage_about: { name: 'Manage about', path: '/admin/manage-executive-members' },
};

// Replicate getRolePermissions logic from Mongoose schema
const getRolePermissions = (adminRole) => {
  const commonPermissions = ['manage_about', 'dashboard', 'learning_hub'];

  switch (adminRole) {
    case 'it_director':
      return [
        ...commonPermissions,
        'super_admin',
        'users_management',
        'requests_management',
        'event_volunteers',
        'projects_management',
        'newsletters_management',
        'products_management',
        'orders_management',
        'donations_management',
      ];
    case 'membership_admin':
      return [
        ...commonPermissions,
        'membership_admin',
        'users_management',
        'requests_management',
      ];
    case 'event_coordinator':
      return [
        ...commonPermissions,
        'event_coordinator',
        'event_volunteers',
        'projects_management',
      ];
    case 'chief_editor':
      return [...commonPermissions, 'chief_editor', 'newsletters_management'];
    case 'treasurer':
      return [
        ...commonPermissions,
        'treasurer',
        'products_management',
        'orders_management',
        'donations_management',
      ];
    default:
      return commonPermissions;
  }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [availableTabs, setAvailableTabs] = useState([]);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
    
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
          console.error('No token found in sessionStorage');
          return;
        }
    
          const response = await axios.get('/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
        const adminRole = response.data.adminRole;
        

        // Get permissions based on adminRole
        const permissions = getRolePermissions(adminRole);

        // Filter tabs based on permissions
        const tabs = Object.keys(permissionToTabMap).reduce((tabs, permission) => {
          if (permissions.includes(permission)) {
            tabs.push(permissionToTabMap[permission]);
          }
          return tabs;
        }, []);

        setAvailableTabs(tabs);
      } catch (error) {
        console.error('Error fetching user permissions:', error);
        setAvailableTabs([]);
      }
    };

    fetchUserPermissions();
  }, []);

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
        {availableTabs.map((tab) => (
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