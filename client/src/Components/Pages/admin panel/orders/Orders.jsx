import React, { useState } from 'react';
import OrderTable from './child-component/OrderTable';
import AddOrderModal from './child-component/AddOrderModal';
import EditOrderModal from './child-component/EditOrderModal';
import OrderStats from './child-component/OrderStats';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: 'Christine Brooks',
      address: '089 Kutch Green Apt. 448',
      date: '04 Sep 2019',
      type: 'Electric',
      status: 'Completed',
      amount: 250.00,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 2,
      name: 'Rosie Pearson',
      address: '979 Immanuel Ferry Suite 526',
      date: '28 May 2019',
      type: 'Book',
      status: 'Processing',
      amount: 75.50,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Darrell Caldwell',
      address: '8587 Frida Ports',
      date: '23 Nov 2019',
      type: 'Medicine',
      status: 'Completed',
      amount: 120.00,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Gilbert Johnston',
      address: '768 Destiny Lake Suite 600',
      date: '05 Feb 2019',
      type: 'Mobile',
      status: 'Completed',
      amount: 899.99,
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
      id: 5,
      name: 'Alan Cain',
      address: '042 Mylene Throughway',
      date: '29 Jul 2019',
      type: 'Watch',
      status: 'Processing',
      amount: 299.99,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Alfred Murray',
      address: '543 Weimann Mountain',
      date: '15 Aug 2019',
      type: 'Medicine',
      status: 'Completed',
      amount: 85.75,
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    {
      id: 7,
      name: 'Maggie Sullivan',
      address: 'New Scottieberg',
      date: '21 Dec 2019',
      type: 'Watch',
      status: 'Processing',
      amount: 450.00,
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
    },
    {
      id: 8,
      name: 'Rosie Todd',
      address: 'New Jon',
      date: '30 Apr 2019',
      type: 'Medicine',
      status: 'Completed',
      amount: 67.25,
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
    },
    {
      id: 9,
      name: 'Dollie Hines',
      address: '124 Lyla Forge Suite 975',
      date: '09 Jan 2019',
      type: 'Book',
      status: 'Completed',
      amount: 45.00,
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const totalRows = orders.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(orders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const handleAddOrder = () => {
    setIsAddModalOpen(true);
  };

  const handleEditOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
  };

  const handleSaveNewOrder = (orderData) => {
    const newOrder = {
      id: orders.length + 1,
      ...orderData,
      date: new Date().toLocaleDateString('en-GB'),
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    setOrders([...orders, newOrder]);
    setIsAddModalOpen(false);
  };

  const handleSaveEditedOrder = (orderData) => {
    setOrders(orders.map(o => 
      o.id === editingOrder.id ? { ...o, ...orderData } : o
    ));
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const currentOrders = orders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const stats = {
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 'Completed').length,
    processingOrders: orders.filter(o => o.status === 'Processing').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0)
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <button
            onClick={handleAddOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Order</span>
          </button>
        </div>

        <OrderStats stats={stats} />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <OrderTable
            orders={currentOrders}
            selectedOrders={selectedOrders}
            onSelectAll={handleSelectAll}
            onSelectOrder={handleSelectOrder}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onUpdateStatus={handleUpdateOrderStatus}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <AddOrderModal
        isOpen={isAddModalOpen}
        onSave={handleSaveNewOrder}
        onCancel={handleCancelAdd}
      />

      <EditOrderModal
        isOpen={isEditModalOpen}
        order={editingOrder}
        onSave={handleSaveEditedOrder}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default Orders;
