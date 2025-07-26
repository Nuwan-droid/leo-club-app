import React, { useState } from 'react';
import ExecutiveCommitteeTable from './child_components/ExecutiveCommitteeTable';
import AddMemberModal from './child_components/AddMemberModal';
import EditMemberModal from './child_components/EditMemberModal';

const ManageAbout = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      phone: 'jonny77',
      role: 'Admin',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      email: 'ollyben@gmail.com',
      phone: 'olly659',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      phone: 'dwarren3',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Chloe Hayes',
      email: 'chloelhye@gmail.com',
      phone: 'chloehh',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      phone: 'reeds7',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Isabelle Clark',
      email: 'belleclark@gmail.com',
      phone: 'bellecl',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      id: 7,
      name: 'Lucas Mitchell',
      email: 'lucamich@gmail.com',
      phone: 'lucamich',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      id: 8,
      name: 'Mark Wilburg',
      email: 'markwill32@gmail.com',
      phone: 'markwill32',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    {
      id: 9,
      name: 'Nicholas Agenn',
      email: 'nicolass009@gmail.com',
      phone: 'nicolass009',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
      id: 10,
      name: 'Mia Nadinn',
      email: 'mianadinn@gmail.com',
      phone: 'mianadinn',
      role: 'Member',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    {
      id: 11,
      name: 'Noemi Villan',
      email: 'noemivill99@gmail.com',
      phone: 'noemi',
      role: 'Admin',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleAddMember = () => {
    setIsAddModalOpen(true);
  };

  const handleEditMember = (memberId) => {
    const member = members.find(m => m.id === memberId);
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const handleSaveNewMember = (memberData) => {
    const newMember = {
      id: members.length + 1,
      ...memberData,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    setMembers([...members, newMember]);
    setIsAddModalOpen(false);
  };

  const handleSaveEditedMember = (memberData) => {
    setMembers(members.map(m => 
      m.id === editingMember.id ? { ...m, ...memberData } : m
    ));
    setIsEditModalOpen(false);
    setEditingMember(null);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingMember(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Manage About</h1>
            <button
              onClick={handleAddMember}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add New Banner</span>
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Executive Committee members</h2>
            <ExecutiveCommitteeTable
              members={members}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
            />
          </div>
        </div>
      </div>

      <AddMemberModal
        isOpen={isAddModalOpen}
        onSave={handleSaveNewMember}
        onCancel={handleCancelAdd}
      />

      <EditMemberModal
        isOpen={isEditModalOpen}
        member={editingMember}
        onSave={handleSaveEditedMember}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default ManageAbout;
