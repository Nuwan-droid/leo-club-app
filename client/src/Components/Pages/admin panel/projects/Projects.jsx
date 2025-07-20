import React, { useState } from 'react';
import CompletedProjectsList from './chid-components/CompletedProjectsList';
import AddProjectModal from './chid-components/AddProjectModal';
import EventCalendar from '../../../Pages/EventCalendar';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Design Conference',
      date: 'Today 07:19 AM',
      location: '56 Davion Mission Suite 157',
      city: 'Meaghanberg',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
      ],
      additionalCount: 15,
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
      description: 'Design conference focused on community development and creative solutions.'
    },
    {
      id: 2,
      name: 'Weekend Festival',
      date: '16 October 2019 at 5:00 PM',
      location: '853 Moore Flats Suite 158',
      city: 'Sweden',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }
      ],
      additionalCount: 20,
      image: 'https://randomuser.me/api/portraits/women/15.jpg',
      description: 'Community festival with entertainment and social activities.'
    },
    {
      id: 3,
      name: 'Glastonbury Festival',
      date: '20-22 October 2019 at 8:00 PM',
      location: '646 Walter Road Apt. 571',
      city: 'Turks and Caicos Islands',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/9.jpg' }
      ],
      additionalCount: 14,
      image: 'https://randomuser.me/api/portraits/women/20.jpg',
      description: 'Large scale music and arts festival with multiple stages.'
    },
    {
      id: 4,
      name: 'Ultra Europe 2019',
      date: '25 October 2019 at 10:00 PM',
      location: '506 Satterfield Tunnel Apt. 963',
      city: 'San Marino',
      attendees: [
        { id: 1, avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { id: 2, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { id: 3, avatar: 'https://randomuser.me/api/portraits/men/13.jpg' }
      ],
      additionalCount: 47,
      image: 'https://randomuser.me/api/portraits/women/25.jpg',
      description: 'Electronic dance music festival with international artists.'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProject = () => {
    setIsAddModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const handleAddToShowcase = (projectId) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Adding project to showcase:', projectId);
      alert('Project added to showcase successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveNewProject = (projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      attendees: [],
      additionalCount: 0,
      image: projectData.image || 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    setProjects([...projects, newProject]);
    setIsAddModalOpen(false);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Projects</h1>
              <p className="text-gray-600">Manage your completed projects and upcoming events</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm text-gray-500">Total Projects: </span>
                <span className="font-semibold text-blue-600">{projects.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Section - Completed Projects */}
          <div className="xl:col-span-5">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Completed Projects</h2>
                    <p className="text-sm text-gray-500 mt-1">Projects ready for showcase</p>
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add New</span>
                  </button>
                </div>
              </div>

              {/* Projects List */}
              <div className="p-6">
                <div className="max-h-[600px] overflow-y-auto space-y-4">
                  <CompletedProjectsList 
                    projects={projects}
                    onDelete={handleDeleteProject}
                    onAddToShowcase={handleAddToShowcase}
                    isLoading={isLoading}
                  />
                </div>

                {/* See More Button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <button className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50">
                      View All Projects
                      <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Event Calendar */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Event Calendar</h2>
                    <p className="text-sm text-gray-500 mt-1">Track upcoming events and deadlines</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Today
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">
                      Month
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Content */}
              <div className="p-6">
                <EventCalendar />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Showcased</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onSave={handleSaveNewProject}
        onCancel={handleCancelAdd}
      />
    </div>
  );
};

export default Projects;
