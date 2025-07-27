import React, { useState } from 'react';
import DonationProjectList from './child_component/DonationProjectList';
import AddDonationProjectModal from './child_component/AddDonationProjectModal';
import EditDonationProjectModal from './child_component/EditDonationProjectModal';

const Donation = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Design Conference',
      startDate: 'Today 07:19 AM',
      endDate: '2024-02-15',
      location: '56 Davion Mission Suite',
      city: 'Meaghanberg',
      items: {
        Books: 20,
        Pens: 20,
        Cloths: 30
      },
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
      ],
      additionalCount: 15,
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
      description: 'A design conference focused on community development and creative solutions for local challenges.'
    },
    {
      id: 2,
      name: 'Glastonbury Festival',
      startDate: '20-22 October 2019 at 8.00',
      endDate: '2019-10-22',
      location: '646 Walter Road Apt.',
      city: 'Turks and Caicos',
      items: {
        Books: 25,
        Pens: 15,
        Cloths: 20
      },
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }
      ],
      additionalCount: 14,
      image: 'https://randomuser.me/api/portraits/women/15.jpg',
      description: 'Community festival with focus on charitable donations and local support initiatives.'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleAddProject = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this donation project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const handleSaveNewProject = (projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      attendees: [],
      additionalCount: 0,
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    setProjects([...projects, newProject]);
    setIsAddModalOpen(false);
  };

  const handleSaveEditedProject = (projectData) => {
    setProjects(projects.map(p => 
      p.id === editingProject.id ? { ...p, ...projectData } : p
    ));
    setIsEditModalOpen(false);
    setEditingProject(null);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Donation Programs</h1>
            <button
              onClick={handleAddProject}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add New Program</span>
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">On going projects</h2>
            <DonationProjectList 
              projects={projects}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          </div>
        </div>
      </div>

      <AddDonationProjectModal
        isOpen={isAddModalOpen}
        onSave={handleSaveNewProject}
        onCancel={handleCancelAdd}
      />

      <EditDonationProjectModal
        isOpen={isEditModalOpen}
        project={editingProject}
        onSave={handleSaveEditedProject}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default Donation;
