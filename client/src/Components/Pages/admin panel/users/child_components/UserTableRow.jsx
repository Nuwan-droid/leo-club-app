import React from "react";

const UserTableRow = ({
  user,
  isSelected,
  onSelect,
  onToggleActive,
}) => {
  const isActive = user.isActive || user.userType === 'active';
  const isInactive = !isActive || user.userType === 'inactive';

  // Debug function to determine the correct user ID
  const getUserIdForToggle = () => {
    if (user.userType === "inactive") {
      // For inactive users, we MUST use originalUserId (the original active user's ID)
      // because the backend controller searches for: InactiveUser.findOne({ originalUserId: userId })
      console.log("🔍 Looking for originalUserId in inactive user:", {
        originalUserId: user.originalUserId,
        userId: user.userId,
        originalId: user.originalId,
        _id: user._id,
        fullUser: user
      });
      
      // Priority order: originalUserId is what the backend expects
      const userId = user.originalUserId || user.userId || user.originalId;
      
      if (!userId) {
        console.error("❌ No originalUserId found in inactive user data!");
        console.error("Available fields:", Object.keys(user));
      }
      
      return userId;
    } else {
      // For active users, use _id for deactivation
      return user._id;
    }
  };

  const handleToggleClick = () => {
    console.log("=== BUTTON CLICK DEBUG START ===");
    const userId = getUserIdForToggle();
    console.log("🔘 Toggle button clicked for user:", {
      userType: user.userType,
      userId: userId,
      userName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      action: isActive ? "Deactivate" : "Activate",
      fullUserObject: user
    });
    
    if (!userId) {
      console.error("❌ No valid user ID found for user:", user);
      alert("Error: Cannot find valid user ID for this operation");
      return;
    }
    
    console.log("📤 Calling onToggleActive with:", { userId, userType: user.userType });
    onToggleActive(userId, user.userType);
    console.log("=== BUTTON CLICK DEBUG END ===");
  };

  return (
    <tr className={`hover:bg-gray-50 ${isInactive ? 'bg-red-50' : ''}`}>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className={`h-10 w-10 rounded-full ${isInactive ? 'opacity-50' : ''}`}
              src={user.userImage || "/default-avatar.png"}
              alt={`${user.firstName} ${user.lastName}`}
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>
      </td>

      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isInactive ? 'text-gray-400' : 'text-gray-900'}`}>
        {user.firstName}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isInactive ? 'text-gray-400' : 'text-gray-900'}`}>
        {user.lastName}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isInactive ? 'text-gray-400' : 'text-gray-900'}`}>
        {user.email}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isInactive ? 'text-gray-400' : 'text-gray-900'}`}>
        {user.role}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isActive
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              isActive ? "bg-green-400" : "bg-red-400"
            }`}
          ></div>
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleClick}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 transform hover:scale-105 ${
              isActive
                ? "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                : "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
            }`}
            title={isActive ? "Deactivate User" : "Activate User"}
          >
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;