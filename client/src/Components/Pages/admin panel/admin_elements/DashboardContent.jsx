import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";
import AddAward from "./AddAward";


const DashboardContent = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [showAwardModal, setShowAwardModal] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resUsers = await fetch("http://localhost:5001/api/users/members/count");
        const dataUsers = await resUsers.json();
        setUserCount(dataUsers.count);

        const resProjects = await fetch("http://localhost:5001/api/projects/allprojects");
        const dataProjects = await resProjects.json();
        setProjectCount(dataProjects.length);

        const resOrders = await fetch("http://localhost:5001/api/orders");
        const dataOrders = await resOrders.json();
        setOrderCount(dataOrders.length);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    { title: "Total Users", value: userCount, icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239"/></svg>, iconBg: "bg-blue-100", textColor: "text-gray-900" },
    { title: "Total Projects", value: projectCount, icon: <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>, iconBg: "bg-yellow-100", textColor: "text-gray-900" },
    { title: "Total Orders", value: orderCount, icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/></svg>, iconBg: "bg-orange-100", textColor: "text-gray-900" }
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title + Add Award Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome to admin dashboard</p>
          </div>
         <button
            onClick={() => setShowAwardModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Add Awards
          </button>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBg={stat.iconBg}
              textColor={stat.textColor}
            />
          ))}
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">New user registration</p>
                <span className="text-xs text-gray-400">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Project completed</p>
                <span className="text-xs text-gray-400">5 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600">New order received</p>
                <span className="text-xs text-gray-400">10 min ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-blue-600 text-sm font-medium">Add User</div>
              </button>
              <button className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-green-600 text-sm font-medium">New Project</div>
              </button>
              <button className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <div className="text-yellow-600 text-sm font-medium">View Reports</div>
              </button>
              <button className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-purple-600 text-sm font-medium">Settings</div>
              </button>
            </div>
          </div>
{/* Add Award Modal - FIXED VERSION */}
{showAwardModal && (
  <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
      <button
        onClick={() => setShowAwardModal(false)}
        className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200"
      >
        ✕
      </button>
      <AddAward closeModal={() => setShowAwardModal(false)} />
    </div>
  </div>
)}

        </div>
      </div>
    </div>



  );
};

export default DashboardContent;
