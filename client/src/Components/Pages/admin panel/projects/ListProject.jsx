import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import AddProject from './AddProject';

const ListProject = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    date: '',
    location: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/projects/allprojects');
      const data = await res.json();
      setAllProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    setEditFormData({
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      date: project.date,
      location: project.location
    });
    setShowEditDialog(true);
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const confirmUpdate = async () => {
    if (!projectToEdit) return;

    try {
      const res = await fetch('http://localhost:5001/api/projects/updateproject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projectToEdit._id || projectToEdit.id, ...editFormData })
      });

      const result = await res.json();
      if (result.success) {
        fetchProjects();
        setShowEditDialog(false);
        setProjectToEdit(null);
        alert('Project updated successfully!');
      } else {
        alert('Failed to update: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Update error.');
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const res = await fetch('http://localhost:5001/api/projects/removeproject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projectToDelete._id || projectToDelete.id })
      });

      const result = await res.json();
      if (result.success) {
        fetchProjects();
        setShowDeleteDialog(false);
        setProjectToDelete(null);
        alert('Project deleted.');
      } else {
        alert('Delete failed: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Delete error.');
    }
  };

  const truncateDescription = (description, maxLength = 50) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

  



      {/* Projects Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Subtitle</th>
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProjects.length ? (
              allProjects.map((project) => (
                <tr key={project._id || project.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.subtitle}</td>
                  <td className="p-4">{project.date}</td>
                  <td className="p-4 max-w-xs">
                    <span title={project.description} className="text-sm text-gray-600">
                      {truncateDescription(project.description)}
                    </span>
                  </td>
                  <td className="p-4">{project.location}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEditClick(project)} className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => handleDeleteClick(project)} className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Project Modal */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-[#000000b0] flex items-center justify-center z-50 overflow-y-auto">
          <div className="relative bg-white w-full max-w-5xl mx-4 my-10 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold z-10"
            >
              ✕
            </button>
            <AddProject />
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-[#000000b0] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl mx-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <div className="space-y-4">
              {['title', 'subtitle', 'date', 'location'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize mb-1">{field}</label>
                  <input
                    type={field === 'date' ? 'date' : 'text'}
                    name={field}
                    value={editFormData[field]}
                    onChange={handleEditInputChange}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-blue-500 focus:ring-2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={editFormData.description}
                  onChange={handleEditInputChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-blue-500 focus:ring-2"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowEditDialog(false)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={confirmUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-[#000000b0] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{projectToDelete?.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteDialog(false)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProject;
