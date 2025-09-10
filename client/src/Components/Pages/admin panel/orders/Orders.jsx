import React, { useState, useEffect } from 'react';
import OrderTable from './child-component/OrderTable';
import OrderStats from './child-component/OrderStats';

const Orders = () => {
  const [memberOrders, setMemberOrders] = useState([]);
  const [visitorOrders, setVisitorOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [memberPage, setMemberPage] = useState(1);
  const [visitorPage, setVisitorPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the admin token from localStorage
        const token = localStorage.getItem('leoToken');
        if (!token) {
          setError('Admin token missing. Please login as admin.');
          setLoading(false);
          return;
        }

        // Add Authorization header
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        // Fetch member orders
        const memberRes = await fetch('http://localhost:5001/api/orders/all?customer_type=member', {
          method: 'GET',
          headers,
        });

        if (!memberRes.ok) {
          throw new Error(`Failed to fetch member orders: ${memberRes.status}`);
        }

        const memberData = await memberRes.json();
        console.log('Member orders response:', memberData);

        // Fetch visitor orders
        const visitorRes = await fetch('http://localhost:5001/api/orders/all?customer_type=visitor', {
          method: 'GET',
          headers,
        });

        if (!visitorRes.ok) {
          throw new Error(`Failed to fetch visitor orders: ${visitorRes.status}`);
        }

        const visitorData = await visitorRes.json();
        console.log('Visitor orders response:', visitorData);

        // Set orders with proper error checking
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

  // Pagination
  const pagedMemberOrders = memberOrders.slice(
    (memberPage - 1) * rowsPerPage,
    memberPage * rowsPerPage
  );
  const pagedVisitorOrders = visitorOrders.slice(
    (visitorPage - 1) * rowsPerPage,
    visitorPage * rowsPerPage
  );

  // Stats calculation with proper data structure
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

        {/* Debug info */}
        <div className="mb-4 text-sm text-gray-600">
          <p>Member Orders: {memberOrders.length}</p>
          <p>Visitor Orders: {visitorOrders.length}</p>
        </div>

        {/* Member Orders */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Member Orders</h2>
          <OrderStats stats={memberStats} />
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <OrderTable
              orders={pagedMemberOrders}
              currentPage={memberPage}
              totalPages={Math.ceil(memberOrders.length / rowsPerPage)}
              rowsPerPage={rowsPerPage}
              totalRows={memberOrders.length}
              onPageChange={setMemberPage}
              adminView={true}
            />
          </div>
        </div>

        {/* Visitor Orders */}
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-3">Visitor Orders</h2>
          <OrderStats stats={visitorStats} />
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <OrderTable
              orders={pagedVisitorOrders}
              currentPage={visitorPage}
              totalPages={Math.ceil(visitorOrders.length / rowsPerPage)}
              rowsPerPage={rowsPerPage}
              totalRows={visitorOrders.length}
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