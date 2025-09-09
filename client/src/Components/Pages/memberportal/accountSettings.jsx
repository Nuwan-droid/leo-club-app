import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminlogo from "../../../../public/profile.png"; // fallback image

const ProfileMenu = () => {
  const [state, setState] = useState({
    isDropdownOpen: false,
    user: null,
    loading: true,
  });

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Toggle dropdown
  const toggleDropdown = () =>
    setState((prev) => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setState((prev) => ({ ...prev, isDropdownOpen: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user profile
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("leoToken");
        if (!token) return console.error("No token found, redirect to login");

        const res = await fetch("http://localhost:5001/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setState((prev) => ({ ...prev, user: data, loading: false }));
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setState((prev) => ({ ...prev, loading: false }));
      }
    })();
  }, []);

  const handleAccountClick = () => {
    setState((prev) => ({ ...prev, isDropdownOpen: false }));
    navigate("/memberportal/account-manage");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("leoToken");
    setState((prev) => ({ ...prev, isDropdownOpen: false }));
    navigate("/");
  };

  const { user, loading, isDropdownOpen } = state;

  if (loading) return <p>Loading...</p>;

  const fullName =
    user?.fullName || user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar + Name */}
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleDropdown}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all duration-200 hover:shadow-md"
        >
          <img
            src={user.profilePic }
            alt="user avatar"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
              <img
                src={user.profilePic}
                alt="user avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{fullName}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.position || user?.role}
                </p>
              </div>
            </div>

            {/* Account Settings */}
            <button
              onClick={handleAccountClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              role="menuitem"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Account Settings</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogoutClick}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              role="menuitem"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
