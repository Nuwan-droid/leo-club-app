import React, { useState, useEffect } from 'react';
import OrderTable from './child-component/OrderTable';
import StatusBadgeBoxes from './child-component/StatusBadge'; 

const Orders = () => {
  const [memberOrders, setMemberOrders] = useState([]);
  const [visitorOrders, setVisitorOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [memberFilter, setMemberFilter] = useState('all');
  const [visitorFilter, setVisitorFilter] = useState('all');

  // Removed pagination - showing all orders

  // Helper function to sort orders by date (newest first)
  const sortOrdersByDate = (orders) => {
    return orders.sort((a, b) => {
      // Try different possible date field names
      const dateA = new Date(a.order_date || a.created_at || a.createdAt || a.date_created || 0);
      const dateB = new Date(b.order_date || b.created_at || b.createdAt || b.date_created || 0);
      
      // Sort in descending order (newest first)
      return dateB - dateA;
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          'Content-Type': 'application/json',
        };

        console.log('Making API calls without authentication');

        // Fetch member orders
        const memberRes = await fetch('http://localhost:5001/api/orders/all?customer_type=member', {
          method: 'GET',
          headers,
        });

        console.log('Member API Response:', memberRes.status, memberRes.statusText);

        if (!memberRes.ok) {
          const errorText = await memberRes.text();
          console.log('Member API Error:', errorText);
          throw new Error(`Failed to fetch member orders: ${memberRes.status} - ${errorText}`);
        }

        const memberData = await memberRes.json();
        console.log('Member data received:', memberData);

        // Fetch visitor orders
        const visitorRes = await fetch('http://localhost:5001/api/orders/all?customer_type=visitor', {
          method: 'GET',
          headers,
        });

        console.log('Visitor API Response:', visitorRes.status, visitorRes.statusText);

        if (!visitorRes.ok) {
          const errorText = await visitorRes.text();
          console.log('Visitor API Error:', errorText);
          throw new Error(`Failed to fetch visitor orders: ${visitorRes.status} - ${errorText}`);
        }

        const visitorData = await visitorRes.json();
        console.log('Visitor data received:', visitorData);

        // Set the data and sort by date (newest first)
        const memberOrdersArray = memberData.success && Array.isArray(memberData.orders) ? memberData.orders : [];
        const visitorOrdersArray = visitorData.success && Array.isArray(visitorData.orders) ? visitorData.orders : [];
        
        setMemberOrders(sortOrdersByDate([...memberOrdersArray]));
        setVisitorOrders(sortOrdersByDate([...visitorOrdersArray]));

      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
        setMemberOrders([]);
        setVisitorOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filterOrders = (orders, filter) => {
    if (filter === 'all') return orders;
    
    if (filter === 'completed') {
      return orders.filter(order => 
        order.order_status === 'delivered' || 
        order.order_status === 'completed' ||
        order.payment_status === 'completed'
      );
    }
    
    if (filter === 'processing') {
      return orders.filter(order => 
        order.order_status === 'processing' || 
        order.order_status === 'confirmed' ||
        order.order_status === 'pending'
      );
    }
    
    return orders;
  };

  const handleMemberFilterChange = (filterType) => {
    setMemberFilter(filterType);
  };

  const handleVisitorFilterChange = (filterType) => {
    setVisitorFilter(filterType);
  };

  const filteredMemberOrders = filterOrders(memberOrders, memberFilter);
  const filteredVisitorOrders = filterOrders(visitorOrders, visitorFilter);

  // Show all orders - no pagination

  const memberStats = {
    totalOrders: memberOrders.length,
    completedOrders: memberOrders.filter(o => 
      o.order_status === 'delivered' || o.payment_status === 'completed'
    ).length,
    processingOrders: memberOrders.filter(o => 
      o.order_status === 'processing' || o.order_status === 'confirmed'
    ).length,
    totalRevenue: memberOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
  };

  const visitorStats = {
    totalOrders: visitorOrders.length,
    completedOrders: visitorOrders.filter(o => 
      o.order_status === 'delivered' || o.payment_status === 'completed'
    ).length,
    processingOrders: visitorOrders.filter(o => 
      o.order_status === 'processing' || o.order_status === 'confirmed'
    ).length,
    totalRevenue: visitorOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
  };

  // Retry function
  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-700">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>

          <div className="space-y-2">
            <button 
              onClick={handleRetry}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Management</h1>

        {/* Member Orders */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Member Orders</h2>
          
          <StatusBadgeBoxes 
            stats={memberStats} 
            onFilterChange={handleMemberFilterChange}
            activeFilter={memberFilter}
          />
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {memberFilter === 'all' ? 'All Member Orders' : 
                   memberFilter === 'completed' ? 'Completed Member Orders' : 
                   'Processing Member Orders'}
                </h3>
                <span className="text-sm text-gray-500">
                  Showing all {filteredMemberOrders.length} orders (newest first)
                </span>
              </div>
            </div>
            
            <OrderTable
              orders={filteredMemberOrders}
              adminView={true}
            />
          </div>
        </div>

        {/* Visitor Orders */}
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Visitor Orders</h2>
          
          <StatusBadgeBoxes 
            stats={visitorStats} 
            onFilterChange={handleVisitorFilterChange}
            activeFilter={visitorFilter}
          />
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {visitorFilter === 'all' ? 'All Visitor Orders' : 
                   visitorFilter === 'completed' ? 'Completed Visitor Orders' : 
                   'Processing Visitor Orders'}
                </h3>
                <span className="text-sm text-gray-500">
                  Showing all {filteredVisitorOrders.length} orders (newest first)
                </span>
              </div>
            </div>
            
            <OrderTable
              orders={filteredVisitorOrders}
              adminView={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Orders;