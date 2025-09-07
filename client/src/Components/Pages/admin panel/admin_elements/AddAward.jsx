import React, { useState, useEffect } from "react";

const AddAward = ({ closeModal }) => {
  const [awards, setAwards] = useState([]);
  const [awardData, setAwardData] = useState({ title: "", winner: "", year: "" });
  const [editAward, setEditAward] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch awards from backend
  const fetchAwards = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/awards");
      const data = await res.json();
      setAwards(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load awards" });
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAwardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const method = editAward ? "PUT" : "POST";
      const url = editAward
        ? `http://localhost:5001/api/awards/${editAward._id}`
        : "http://localhost:5001/api/awards";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(awardData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage({ type: "success", text: editAward ? "Award updated successfully! 🎉" : "Award added successfully! 🏆" });

      if (editAward) {
        setAwards(prev => prev.map(a => (a._id === data._id ? data : a)));
      } else {
        setAwards(prev => [...prev, data]);
      }

      setAwardData({ title: "", winner: "", year: "" });
      setEditAward(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (award) => {
    setAwardData({ title: award.title, winner: award.winner, year: award.year });
    setEditAward(award);
    setMessage({ type: "", text: "" });
  };

  const handleCancelEdit = () => {
    setEditAward(null);
    setAwardData({ title: "", winner: "", year: "" });
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this award?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/awards/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete award");
      setAwards(prev => prev.filter(a => a._id !== id));
      setMessage({ type: "success", text: "Award deleted successfully! ✅" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to delete award" });
    }
  };

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🏆 Award Management System
              </h1>
              <p className="text-gray-600">Manage your awards with ease</p>
            </div>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 transition-all duration-300 ${
            message.type === "success" 
              ? "bg-green-50 text-green-800 border-green-400" 
              : "bg-red-50 text-red-800 border-red-400"
          }`}>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                message.type === "success" ? "bg-green-400" : "bg-red-400"
              }`}></div>
              <span className="font-medium">{message.text}</span>
              <button
                onClick={() => setMessage({ type: "", text: "" })}
                className="ml-auto text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Award Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">{editAward ? "✏️" : "➕"}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editAward ? "Edit Award" : "Add New Award"}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Award Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={awardData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="e.g., Best Picture"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Winner
                    </label>
                    <input
                      type="text"
                      name="winner"
                      value={awardData.winner}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={awardData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="2024"
                      min="1900"
                      max={new Date().getFullYear() + 10}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  {editAward && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !awardData.title || !awardData.winner || !awardData.year}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      loading ? "animate-pulse" : ""
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </div>
                    ) : editAward ? "Update Award" : "Add Award"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Awards List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">All Awards</h3>
                      <p className="text-sm text-gray-600">{awards.length} awards total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden">
                {awards.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No awards yet</h4>
                    <p className="text-gray-500">Start by adding your first award!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-6 py-4 font-semibold text-gray-700">Title</th>
                          <th className="text-left px-6 py-4 font-semibold text-gray-700">Winner</th>
                          <th className="text-left px-6 py-4 font-semibold text-gray-700">Year</th>
                          <th className="text-left px-6 py-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {awards.map((award) => (
                          <tr
                            key={award._id}
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                              editAward && editAward._id === award._id ? "bg-purple-50 border-purple-200" : ""
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-800">{award.title}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-700">{award.winner}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {award.year}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(award)}
                                  className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-200 text-sm font-medium"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(award._id)}
                                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAward;