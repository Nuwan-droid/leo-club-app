import React, { useState } from 'react';
import UserTable from './child_components/UserTable';
import UsersPagination from './child_components/UsersPagination';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      username: 'jonny77',
      status: 'Active',
      role: 'Admin',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      email: 'ollyben@gmail.com',
      username: 'olly659',
      status: 'Inactive',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      username: 'dwarren3',
      status: 'Banned',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Chloe Hayes',
      email: 'chloelhye@gmail.com',
      username: 'chloehh',
      status: 'Pending',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      username: 'reeds7',
      status: 'Suspended',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Isabelle Clark',
      email: 'belleclark@gmail.com',
      username: 'bellecl',
      status: 'Active',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      id: 7,
      name: 'Lucas Mitchell',
      email: 'lucamich@gmail.com',
      username: 'lucamich',
      status: 'Active',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      id: 8,
      name: 'Mark Wilburg',
      email: 'markwill32@gmail.com',
      username: 'markwill32',
      status: 'Banned',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    {
      id: 9,
      name: 'Nicholas Agenn',
      email: 'nicolass009@gmail.com',
      username: 'nicolass009',
      status: 'Suspended',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
      id: 10,
      name: 'Mia Nadinn',
      email: 'mianadinn@gmail.com',
      username: 'mianadinn',
      status: 'Inactive',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    {
      id: 11,
      name: 'Noemi Villan',
      email: 'noemivill99@gmail.com',
      username: 'noemi',
      status: 'Active',
      role: 'Admin',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const totalRows = users.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
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
      </div>
    </div>
  );
};

export default Users;
