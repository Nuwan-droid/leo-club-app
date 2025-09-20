import React from "react";

const ActionButtons = ({onToggleActive, isActive }) => {
  return (
    <div className="flex space-x-2">
      {/* Active/Inactive Toggle */}
      <button
        onClick={onToggleActive}
        className={`px-2 py-1 text-sm rounded ${
          isActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
        title={isActive ? "Set Inactive" : "Set Active"}
      >
        {isActive ? "Active" : "Inactive"}
      </button>
    </div>
  );
};

export default ActionButtons;