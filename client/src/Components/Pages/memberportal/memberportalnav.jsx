import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Import icons
import leoLogo from '../../../assets/LEO-Logo.png';

const MemberPortalNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Split nav items for better handling in desktop vs. mobile
  const mainNavItems = [
    { name: 'Home', path: '/memberportal' },
    { name: 'Learning Hub', path: '/memberportal/learning-hub' },
    { name: 'Event Volunteer', path: '/memberportal/event-volunteer' },
    { name: 'Join Newsletter', path: '/memberportal/join-newsletter' },
  ];

  const allNavItems = [
    ...mainNavItems,
    { name: 'Notifications', path: '/memberportal/notifications' }, // Corrected path
    { name: 'Account', path: '/memberportal/account' }             // Corrected path
  ];

  const isActive = (path) => location.pathname === path;
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src={leoLogo} 
              alt="LEO Club Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-semibold text-gray-900 hidden sm:block">Member Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1">
            {/* Main Text-based Links */}
            <div className="flex items-center space-x-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
                 
              ))} 
              
           
            </div>

            

            {/* Divider and Icon-based Links */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
              <Link
                to="/memberportal/notifications"
                aria-label="Notifications"
                className="p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                <FaBell className="h-5 w-5" />
              </Link>
              <Link
                to="/memberportal/account"
                aria-label="Account"
                className="p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                <FaUserCircle className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {allNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-600 transition-colors duration-200 mt-2">
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MemberPortalNav;
