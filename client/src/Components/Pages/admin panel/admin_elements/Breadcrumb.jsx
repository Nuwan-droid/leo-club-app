import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/admin');
  };

  const getBreadcrumbItems = () => {
    const items = [
      { name: 'Dashboard', icon: '🏠', clickable: true, onClick: handleHomeClick }
    ];


    const pathMapping = {
      '/admin': 'Dashboard',
      '/admin/users': 'Users',
      '/admin/request': 'Request',
      '/admin/projects': 'Projects',
      '/admin/eventCalendar': 'Event Calendar',
      '/admin/newsletters': 'Newsletters',
      '/admin/learning-hub': 'Learning Hub',
      '/admin/event-volunteer': 'Event Volunteer',
      '/admin/products': 'Products',
      '/admin/orders': 'Orders',
      '/admin/donation': 'Donation',
      '/admin/manage-about': 'Manage About'
    };

    const currentPath = location.pathname;
    const currentPageName = pathMapping[currentPath] || 'Dashboard';

    if (currentPageName !== 'Dashboard') {
      items.push({ name: currentPageName, icon: null, clickable: false });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="px-6 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-1">
              {item.clickable ? (
                <button
                  onClick={item.onClick}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {item.icon && <span className="text-base">{item.icon}</span>}
                  <span className="hover:underline">{item.name}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-1">
                  {item.icon && <span className="text-base">{item.icon}</span>}
                  <span className={index === breadcrumbItems.length - 1 ? 'font-medium text-gray-900' : ''}>
                    {item.name}
                  </span>
                </div>
              )}
            </div>
            {index < breadcrumbItems.length - 1 && (
              <span className="text-gray-400">{'>'}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
