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
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch active and inactive users
  const fetchAllUsers = async () => {
    try {
      setLoading(true);

      const [activeRes, inactiveRes] = await Promise.all([
        axios.get("http://localhost:5001/api/user/getAllUsers"),
        axios.get("http://localhost:5001/api/user/getInactiveUsers")
      ]);

      const activeUsers = Array.isArray(activeRes.data.users)
        ? activeRes.data.users.map(user => ({
            ...user,
            isActive: true,
            userType: 'active',
            tableId: user._id
          }))
        : [];

      const inactiveUsers = Array.isArray(inactiveRes.data.users)
        ? inactiveRes.data.users.map(user => {
            // Debug: Log the inactive user structure
            console.log("🔍 Inactive user structure:", user);
            console.log("🔍 Available fields:", Object.keys(user));
            
            return {
              ...user,
              isActive: false,
              userType: 'inactive',
              // CRITICAL: Make sure originalUserId is set correctly
              // The backend controller expects this field to find the inactive user
              originalUserId: user.originalUserId || user.userId || user.originalId,
              tableId: user._id
            };
          })
        : [];

      console.log("✅ Active users loaded:", activeUsers.length);
      console.log("✅ Inactive users loaded:", inactiveUsers.length);

      setUsers([...activeUsers, ...inactiveUsers]);
      setErrorMsg("");
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setErrorMsg("Failed to load users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const totalRows = users.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    setSelectedUsers(checked ? users.map((user) => user.tableId) : []);
  };

  const handleSelectUser = (userId, checked) => {
    setSelectedUsers(
      checked
        ? [...selectedUsers, userId]
        : selectedUsers.filter((id) => id !== userId)
    );
  };

  // Toggle active/inactive
  const handleToggleActive = async (userId, userType) => {
    console.log("=== TOGGLE ACTIVE DEBUG START ===");
    console.log("handleToggleActive called with:", { userId, userType });
    console.log("User ID type:", typeof userId);
    console.log("User ID value:", userId);
    setErrorMsg("");

    // Validate userId
    if (!userId) {
      console.error("❌ Invalid user ID provided");
      setErrorMsg("Invalid user ID provided");
      return;
    }

    try {
      let res;
      let endpoint;
      let requestData = {};
      
      if (userType === 'active') {
        // Deactivate user
        endpoint = `http://localhost:5001/api/user/inactivateUser/${userId}`;
        console.log("🔴 Deactivating user with endpoint:", endpoint);
      } else if (userType === 'inactive') {
        // Reactivate user
        endpoint = `http://localhost:5001/api/user/reactivateUser/${userId}`;
        console.log("🟢 Reactivating user with endpoint:", endpoint);
      }

      console.log("📤 Making request to:", endpoint);
      console.log("📤 Request method: PATCH");
      console.log("📤 Request data:", requestData);

      // Make the request
      res = await axios.patch(endpoint, requestData);

      console.log("✅ API response successful");
      console.log("📥 Response status:", res.status);
      console.log("📥 Response data:", res.data);

      if (res.data) {
        console.log("🔄 Refreshing user list...");
        await fetchAllUsers();
        // Reset page if current page is now empty
        if (currentPage > 1 && users.length <= (currentPage - 1) * rowsPerPage) {
          setCurrentPage(1);
        }
        console.log("✅ User list refreshed successfully");
      }
    } catch (err) {
      console.error("=== ERROR DETAILS START ===");
      console.error("❌ Error toggling active status:", err);
      
      // More detailed error logging
      console.error("Error message:", err.message);
      console.error("Error name:", err.name);
      console.error("Error code:", err.code);
      
      if (err.response) {
        console.error("📥 Response error details:");
        console.error("  - Status:", err.response.status);
        console.error("  - Status text:", err.response.statusText);
        console.error("  - Headers:", err.response.headers);
        console.error("  - Data:", err.response.data);
        console.error("  - URL:", err.response.config?.url);
        console.error("  - Method:", err.response.config?.method);
      } else if (err.request) {
        console.error("📤 Request error details:");
        console.error("  - Request:", err.request);
        console.error("  - No response received from server");
      } else {
        console.error("⚙️ Setup error:", err.message);
      }

      console.error("Full axios config:", err.config);
      console.error("=== ERROR DETAILS END ===");

      // Set user-friendly error message
      if (err.response) {
        const statusCode = err.response.status;
        const errorMessage = err.response.data?.message || err.response.data?.error || "Server error";
        setErrorMsg(`Failed to update user status (${statusCode}): ${errorMessage}`);
      } else if (err.request) {
        setErrorMsg("Network error: Could not reach server. Please check your connection.");
      } else {
        setErrorMsg(`Failed to update user status: ${err.message}`);
      }
    }

    console.log("=== TOGGLE ACTIVE DEBUG END ===");
  };

  const currentUsers = Array.isArray(users)
    ? users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-600">Loading users...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 mx-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{errorMsg}</p>
                  </div>
                </div>
              </div>
            )}

            <UserTable
              users={currentUsers}
              selectedUsers={selectedUsers}
              onSelectAll={handleSelectAll}
              onSelectUser={handleSelectUser}
              onToggleActive={handleToggleActive}
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
    </div>
  );
};

export default Users;