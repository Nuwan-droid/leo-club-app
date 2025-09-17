import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminlogo from "../../../../../public/profile.png";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  useEffect(() => {
    (async () => {
      try {
        const token = sessionStorage.getItem("adminToken");
        if (!token) {
          console.error("No token found, redirect to login");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5001/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setLoading(false);
      }
    })();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAccountClick = () => {
    setIsDropdownOpen(false);
    navigate("/admin/account-settings");
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDropdown}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-all duration-200 hover:shadow-md"
              >
                <img
                  src={user?.profilePic || Adminlogo}
                  alt="admin logo"
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                />
              </button>
              <div>
                {!loading ? (
                  <>
                    <p className="text-sm font-medium">{user?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{user?.role || "User"}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">Loading...</p>
                )}
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.profilePic || Adminlogo}
                        alt="admin logo"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">{user?.role || "User"}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAccountClick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 flex items-center space-x-2"
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

                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 flex items-center space-x-2"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
