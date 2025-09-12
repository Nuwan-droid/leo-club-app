import React, { useState, useEffect } from 'react';
import DonationProjectList from './child_component/DonationProjectList';
import AddDonationProjectModal from './child_component/AddDonationProjectModal';
import EditDonationProjectModal from './child_component/EditDonationProjectModal';
import DonationDetails from './child_component/DonationDetails';

const API_BASE_URL = 'http://localhost:5001/api/donation-projects';

const Donation = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isDonationDetailsOpen, setIsDonationDetailsOpen] = useState(false);
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const result = await response.json();

      if (result.success) {
        const transformedProjects = result.data.map(project => ({
          id: project.donation_project_id,
          name: project.title,
          startDate: new Date(project.start_date).toLocaleDateString(),
          endDate: new Date(project.end_date).toLocaleDateString(),
          location: project.location,
          city: project.city,
          items: {
            Books: project.donation_items.books.required,
            Pens: project.donation_items.pens.required,
            Cloths: project.donation_items.clothes.required
          },
          received: {
            Books: project.donation_items.books.received,
            Pens: project.donation_items.pens.received,
            Cloths: project.donation_items.clothes.received
          },
          attendees: [],
          additionalCount: 0,
          image: project.image_path || 'https://randomuser.me/api/portraits/men/10.jpg',
          description: project.description,
          _originalData: project
        }));
        setProjects(transformedProjects);
      } else {
        setError('Failed to fetch donation projects');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => setIsAddModalOpen(true);

  const handleEditProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this donation project?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/${projectId}`, { method: 'DELETE' });
        const result = await response.json();
        if (result.success) {
          setProjects(projects.filter(p => p.id !== projectId));
          alert('Donation project deleted successfully!');
        } else {
          alert('Error deleting project: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleViewDonations = (projectId, projectTitle) => {
    setSelectedProjectForDetails({ id: projectId, title: projectTitle });
    setIsDonationDetailsOpen(true);
  };

  const handleCloseDonationDetails = () => {
    setIsDonationDetailsOpen(false);
    setSelectedProjectForDetails(null);
  };

  const handleSaveNewProject = async (projectData) => {
    try {
      let imageUrl = null;
      if (projectData.image && projectData.image.startsWith('data:')) {
        try {
          const formData = new FormData();
          const response = await fetch(projectData.image);
          const blob = await response.blob();
          formData.append('mainImage', blob, 'project-image.jpg');
          const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData
          });
          const uploadResult = await uploadResponse.json();
          if (uploadResult.success) {
            imageUrl = uploadResult.imageUrl;
          }
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
        }
      }

      const backendData = {
        title: projectData.name,
        description: projectData.description,
        start_date: projectData.startDate,
        end_date: projectData.endDate,
        location: projectData.location,
        city: projectData.city,
        image_path: imageUrl,
        books: projectData.items.Books,
        pens: projectData.items.Pens,
        clothes: projectData.items.Cloths || projectData.items.Clothes || 0
      };

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData)
      });

      const result = await response.json();
      if (result.success) {
        await fetchProjects();
        setIsAddModalOpen(false);
        alert('Donation project added successfully!');
      } else {
        alert('Error adding project: ' + result.message);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    }
  };

  const handleSaveEditedProject = async (projectData) => {
    try {
      const backendData = {
        title: projectData.name,
        description: projectData.description,
        start_date: projectData.startDate,
        end_date: projectData.endDate,
        location: projectData.location,
        city: projectData.city,
        image_path: projectData.image,
        books: projectData.items.Books,
        pens: projectData.items.Pens,
        clothes: projectData.items.Cloths
      };

      const response = await fetch(`${API_BASE_URL}/${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData)
      });

      const result = await response.json();
      if (result.success) {
        await fetchProjects();
        setIsEditModalOpen(false);
        setEditingProject(null);
        alert('Donation project updated successfully!');
      } else {
        alert('Error updating project: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    }
  };

  const handleCancelAdd = () => setIsAddModalOpen(false);
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Donation Programs</h1>
            <button
              onClick={handleAddProject}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              disabled={loading}
            >
              <span>+</span>
              <span>Add New Program</span>
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-700">Loading donation projects...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="text-red-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <button
                    onClick={fetchProjects}
                    className="text-sm text-red-800 underline hover:text-red-900 mt-2"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Ongoing projects</h2>
                <span className="text-sm text-gray-700">
                  {projects.length} project{projects.length !== 1 ? 's' : ''}
                </span>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No donation projects yet</h3>
                  <p className="text-gray-600 mb-4">Get started by creating your first donation project</p>
                  <button
                    onClick={handleAddProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Project
                  </button>
                </div>
              ) : (
                <DonationProjectList
                  projects={projects}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  onViewDonations={handleViewDonations}
                />
              )}
            </div>
          )}
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

      {isDonationDetailsOpen && selectedProjectForDetails && (
        <DonationDetails
          projectId={selectedProjectForDetails.id}
          projectTitle={selectedProjectForDetails.title}
          onClose={handleCloseDonationDetails}
        />
      )}
    </div>
  );
};

export default Donation;
