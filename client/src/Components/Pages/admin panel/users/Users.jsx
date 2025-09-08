import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './child_components/UserTable';
import UsersPagination from './child_components/UsersPagination';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/user/getAllUsers"); 
        setUsers(res.data.users);

      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalRows = users.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    setSelectedUsers(checked ? users.map(user => user.id) : []);
  };

  const handleSelectUser = (userId, checked) => {
    setSelectedUsers(
      checked
        ? [...selectedUsers, userId]
        : selectedUsers.filter(id => id !== userId)
    );
  };

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5001/api/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const currentUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>

        {loading ? (
          <p className="text-gray-600">Loading users...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <UserTable
              users={currentUsers}
              selectedUsers={selectedUsers}
              onSelectAll={handleSelectAll}
              onSelectUser={handleSelectUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <UsersPagination
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
        )}
      </div>
    </div>
  );
};

export default Users;
