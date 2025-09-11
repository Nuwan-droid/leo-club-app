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

  const [memberPage, setMemberPage] = useState(1);
  const [visitorPage, setVisitorPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('leoToken');
        if (!token) {
          setError('Admin token missing. Please login as admin.');
          setLoading(false);
          return;
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

      
        const memberRes = await fetch('http://localhost:5001/api/orders/all?customer_type=member', {
          method: 'GET',
          headers,
        });

        if (!memberRes.ok) {
          throw new Error(`Failed to fetch member orders: ${memberRes.status}`);
        }

        const memberData = await memberRes.json();

        
        const visitorRes = await fetch('http://localhost:5001/api/orders/all?customer_type=visitor', {
          method: 'GET',
          headers,
        });

        if (!visitorRes.ok) {
          throw new Error(`Failed to fetch visitor orders: ${visitorRes.status}`);
        }

        const visitorData = await visitorRes.json();

        setMemberOrders(memberData.success && Array.isArray(memberData.orders) ? memberData.orders : []);
        setVisitorOrders(visitorData.success && Array.isArray(visitorData.orders) ? visitorData.orders : []);

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
    setMemberPage(1); 
  };

  const handleVisitorFilterChange = (filterType) => {
    setVisitorFilter(filterType);
    setVisitorPage(1); 
  };

 
  const filteredMemberOrders = filterOrders(memberOrders, memberFilter);
  const filteredVisitorOrders = filterOrders(visitorOrders, visitorFilter);

 
  const pagedMemberOrders = filteredMemberOrders.slice(
    (memberPage - 1) * rowsPerPage,
    memberPage * rowsPerPage
  );
  const pagedVisitorOrders = filteredVisitorOrders.slice(
    (visitorPage - 1) * rowsPerPage,
    visitorPage * rowsPerPage
  );


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
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Management</h1>

       
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
                  Showing {filteredMemberOrders.length} of {memberOrders.length} orders
                </span>
              </div>
            </div>
            
            <OrderTable
              orders={pagedMemberOrders}
              currentPage={memberPage}
              totalPages={Math.ceil(filteredMemberOrders.length / rowsPerPage)}
              rowsPerPage={rowsPerPage}
              totalRows={filteredMemberOrders.length}
              onPageChange={setMemberPage}
              adminView={true}
            />
          </div>
        </div>

       
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
                  Showing {filteredVisitorOrders.length} of {visitorOrders.length} orders
                </span>
              </div>
            </div>
            
            <OrderTable
              orders={pagedVisitorOrders}
              currentPage={visitorPage}
              totalPages={Math.ceil(filteredVisitorOrders.length / rowsPerPage)}
              rowsPerPage={rowsPerPage}
              totalRows={filteredVisitorOrders.length}
              onPageChange={setVisitorPage}
              adminView={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;