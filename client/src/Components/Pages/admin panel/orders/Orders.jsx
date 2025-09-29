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

  // Helper function to check if order is completed
  const isOrderCompleted = (order) => {
    return (
      order.order_status === 'delivered' || 
      order.order_status === 'completed' ||
      order.order_status === 'confirmed' ||
      order.payment_status === 'completed'
    );
  };

  // Filter orders to show only completed ones
  const filterToCompletedOrders = (orders) => {
    return orders.filter(order => isOrderCompleted(order));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          'Content-Type': 'application/json',
        };

        console.log('Fetching all orders for admin (completed only)...');

        // Fetch member orders - Get all orders for frontend pagination
        const memberRes = await fetch('http://localhost:5001/api/orders/all?customer_type=member&limit=999999', {
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

        // Fetch visitor orders - Get all orders for frontend pagination
        const visitorRes = await fetch('http://localhost:5001/api/orders/all?customer_type=visitor&limit=999999', {
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

        // Get orders and filter to completed only
        const memberOrdersArray = memberData.success && Array.isArray(memberData.orders) ? memberData.orders : [];
        const visitorOrdersArray = visitorData.success && Array.isArray(visitorData.orders) ? visitorData.orders : [];
        
        // IMPORTANT: Filter to show only completed orders
        const completedMemberOrders = filterToCompletedOrders(memberOrdersArray);
        const completedVisitorOrders = filterToCompletedOrders(visitorOrdersArray);
        
        console.log(`Total member orders: ${memberOrdersArray.length}, Completed: ${completedMemberOrders.length}`);
        console.log(`Total visitor orders: ${visitorOrdersArray.length}, Completed: ${completedVisitorOrders.length}`);
        
        setMemberOrders(sortOrdersByDate([...completedMemberOrders]));
        setVisitorOrders(sortOrdersByDate([...completedVisitorOrders]));

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

  // Since we're only showing completed orders, all filtering just returns the same data
  const filterOrders = (orders, filter) => {
    // All orders are already completed, so all filters return the same data
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

  // Update stats - since all orders are completed
  const memberStats = {
    totalOrders: memberOrders.length,
    completedOrders: memberOrders.length, // All orders are completed
    processingOrders: 0, // No processing orders shown
    totalRevenue: memberOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
  };

  const visitorStats = {
    totalOrders: visitorOrders.length,
    completedOrders: visitorOrders.length, // All orders are completed
    processingOrders: 0, // No processing orders shown
    totalRevenue: visitorOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
  };

  // Retry function
  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="text-lg text-gray-700">Loading completed orders...</div>
        </div>
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
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalAllOrders = memberOrders.length + visitorOrders.length;
  const totalAllRevenue = memberStats.totalRevenue + visitorStats.totalRevenue;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600 mb-6">Showing completed orders only</p>

        {/* Overall Summary Card */}
        <div className="bg-gradient-to-r bg-blue-500 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Orders Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalAllOrders}</div>
                  <div className="text-sm opacity-90">Total Completed Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{memberOrders.length}</div>
                  <div className="text-sm opacity-90">Member Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{visitorOrders.length}</div>
                  <div className="text-sm opacity-90">Visitor Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Rs {totalAllRevenue.toFixed(2)}</div>
                  <div className="text-sm opacity-90">Total Revenue</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <svg className="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Member Orders */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Member Orders (Completed)</h2>
          
          <StatusBadgeBoxes 
            stats={memberStats} 
            onFilterChange={handleMemberFilterChange}
            activeFilter={memberFilter}
          />
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Completed Member Orders
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {filteredMemberOrders.length} completed orders
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed Only
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    10 per page
                  </span>
                </div>
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
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Visitor Orders (Completed)</h2>
          
          <StatusBadgeBoxes 
            stats={visitorStats} 
            onFilterChange={handleVisitorFilterChange}
            activeFilter={visitorFilter}
          />
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Completed Visitor Orders
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {filteredVisitorOrders.length} completed orders
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed Only
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    10 per page
                  </span>
                </div>
              </div>
            </div>
            
            <OrderTable
              orders={filteredVisitorOrders}
              adminView={true}
            />
          </div>
        </div>

        {/* No Orders Message */}
        {memberOrders.length === 0 && visitorOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center mt-8">
            <div className="text-gray-500 text-lg mb-2">No completed orders found</div>
            <div className="text-gray-400 text-sm">Completed orders will appear here once customers finish their purchases.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;