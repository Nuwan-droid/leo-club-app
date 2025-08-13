import React, { useEffect, useState } from 'react';
import AddEventCalendar from './AddEventCalendar'; // ✅ Import your AddEventCalendar component

const ListEventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', date: '', time: '', location: '' });
  const [loading, setLoading] = useState(true);

  // ✅ New state for modal
  const [showAddDialog, setShowAddDialog] = useState(false);

  /* ---------- Helpers ---------- */
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res   = await fetch('http://localhost:5001/api/events');
      const data  = await res.json();
      if (data.success) setEvents(data.events);
      else alert('Failed to fetch events.');
    } catch (err) {
      console.error(err);
      alert('Error fetching events.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (ev) => {
    setEditingId(ev._id);
    setForm({ name: ev.name, date: ev.date, time: ev.time, location: ev.location });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', date: '', time: '', location: '' });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveEdit = async () => {
    try {
      const res  = await fetch(`http://localhost:5001/api/events/${editingId}`, {
        method : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        alert('Event updated');
        cancelEdit();
        fetchEvents();
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating event.');
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res  = await fetch(`http://localhost:5001/api/events/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('Event deleted');
        fetchEvents();
      } else alert('Delete failed');
    } catch (err) {
      console.error(err);
      alert('Error deleting event.');
    }
  };

  /* ---------- Lifecycle ---------- */
  useEffect(() => { fetchEvents(); }, []);

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ✅ Top header with Add Event button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-blue-700">Event Calendar List</h2>
          <button
            onClick={() => setShowAddDialog(true)}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            + Add Event
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600">No events found.</p>
        ) : (
          <div className="space-y-6">
            {events.map((ev) => (
              <div key={ev._id} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                {editingId === ev._id ? (
                  <>
                    {/* ------------ Edit Form ------------- */}
                    <div className="grid sm:grid-cols-2 gap-4 text-black">
                      <input
                        className="border rounded p-2"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Event name"
                      />
                      <input
                        className="border rounded p-2"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                      />
                      <input
                        className="border rounded p-2"
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                      />
                      <input
                        className="border rounded p-2"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                      />
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* ------------ Display Card ------------- */}
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{ev.name}</h3>
                    <p className="text-gray-600">
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(ev.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Time:</span> {ev.time}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Location:</span> {ev.location}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => startEdit(ev)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(ev._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ✅ Add Event Modal */}
        {showAddDialog && (
          <div className="fixed inset-0 bg-[#000000b0] z-50 flex items-center justify-center overflow-y-auto">
            <div className="relative bg-white w-full max-w-3xl mx-4 my-10 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
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

      </div>
    </div>
  );
};

export default ListEventCalendar;
