import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import AddEventCalendar from "./AddEventCalendar";

const ListEventCalendar = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/events");
      const data = await res.json();
      if (data.success) setAllEvents(data.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleDeleteClick = (ev) => {
    setEventToDelete(ev);
    setShowDeleteDialog(true);
  };

  const handleEditClick = (ev) => {
    setEventToEdit(ev);
    setEditFormData({
      name: ev.name,
      date: ev.date,
      time: ev.time,
      location: ev.location,
      description: ev.description,
    });
    setShowEditDialog(true);
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const confirmUpdate = async () => {
    if (!eventToEdit) return;

    try {
      const formData = new FormData();
      formData.append("name", editFormData.name);
      formData.append("date", editFormData.date);
      formData.append("time", editFormData.time);
      formData.append("location", editFormData.location);
      formData.append("description", editFormData.description);

      const res = await fetch(
        `http://localhost:5001/api/events/${eventToEdit._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await res.json();
      if (result.success) {
        fetchEvents();
        setShowEditDialog(false);
        setEventToEdit(null);
        alert("Event updated successfully!");
      } else {
        alert("Failed to update: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Update error.");
    }
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/events/${eventToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();
      if (result.success) {
        fetchEvents();
        setShowDeleteDialog(false);
        setEventToDelete(null);
        alert("Event deleted.");
      } else {
        alert("Delete failed: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Delete error.");
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Calendar</h1>
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4">Cover</th>
              <th className="p-4">Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Location</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.length ? (
              allEvents.map((ev) => (
                <tr
                  key={ev._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {ev.coverImage && (
                      <img
                        src={`http://localhost:5001/events/${ev.coverImage}`}
                        alt={ev.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-4 font-medium">{ev.name}</td>
                  <td className="p-4">
                    {new Date(ev.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-4">{ev.time}</td>
                  <td className="p-4">{ev.location}</td>
                  <td className="p-4 max-w-xs">
                    <span
                      title={ev.description}
                      className="text-sm text-gray-600"
                    >
                      {truncateText(ev.description)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(ev)}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(ev)}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Event Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-[#000000b0] flex items-center justify-center z-50 overflow-y-auto">
          <div className="relative bg-white w-full max-w-5xl mx-4 my-10 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold z-10"
            >
              ✕
            </button>
            <AddEventCalendar />
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-[#000000b0] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl mx-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
            <div className="space-y-4">
              {["name", "date", "time", "location"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize mb-1">
                    {field}
                  </label>
                  <input
                    type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                    name={field}
                    value={editFormData[field]}
                    onChange={handleEditInputChange}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-blue-500 focus:ring-2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
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
              <button
                onClick={() => setShowEditDialog(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-[#000000b0] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <strong>{eventToDelete?.name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEventCalendar;
