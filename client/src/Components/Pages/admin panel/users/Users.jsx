import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./child_components/UserTable";
import UsersPagination from "./child_components/UsersPagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/user/getAllUsers");
        setUsers(res.data.users || []);
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
    setSelectedUsers(checked ? users.map((user) => user.id) : []);
  };

  const handleSelectUser = (userId, checked) => {
    setSelectedUsers(
      checked ? [...selectedUsers, userId] : selectedUsers.filter((id) => id !== userId)
    );
  };

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
  };

  // Called from child - opens modal
  const handleDelete = (userId) => {
    setErrorMsg("");
    setUserToDelete(userId);
    setShowConfirm(true);
  };

  // Confirmed delete action
  const confirmDelete = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    setErrorMsg("");
    try {
      await axios.delete(`http://localhost:5001/api/users/${userToDelete}`);
      // update list
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
      // if the current page becomes empty after deletion, go to previous page if possible
      const remainingRowsOnPage =
        (totalRows - 1) - (currentPage - 1) * rowsPerPage;
      if (remainingRowsOnPage <= 0 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
      setShowConfirm(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      setErrorMsg("Failed to delete user. Try again.");
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setUserToDelete(null);
    setErrorMsg("");
  };

  const currentUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
              onDelete={handleDelete} // still the same prop
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={cancelDelete}
          />

          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                    {/* trash icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                    Delete user
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to delete this user? This action cannot be undone.
                  </p>

                  {errorMsg && (
                    <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 disabled:opacity-60"
                >
                  {deleting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
