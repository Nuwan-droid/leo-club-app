import React, { useState, useEffect } from "react";
import ProgressCircle from "../../Elements/ProgressCircle ";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = sessionStorage.getItem("memberToken");
        if (!token) {
          console.error("No token found, redirect to login");
          return;
        }

        const res = await fetch("http://localhost:5001/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // 🔑 Send token here
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p>Could not load profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome, {user.name || "Member"}...!
            </h2>
            <p className="text-gray-500 text-sm">{user.role}</p>
          </div>
        </div>
        <div className="flex items-center">
          <ProgressCircle
            score={user.score || 0}
            maxScore={user.maxScore || 100}
            size={24}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {user.newsletter || 0}
            </div>
            <div className="text-xs text-gray-500">Newsletter</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {user.events || 0}
            </div>
            <div className="text-xs text-gray-500">Events</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
