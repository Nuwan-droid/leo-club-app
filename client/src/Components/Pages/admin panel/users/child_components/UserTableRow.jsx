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

  // Format score display - make sure it shows the actual number
  const formatScore = (score) => {
    // Debug log to see what score values we're getting
    console.log("🔍 formatScore called with:", { score, type: typeof score, user: `${user.firstName} ${user.lastName}` });
    
    if (score === null || score === undefined) {
      return "0";
    }
    if (typeof score === 'number') {
      return score.toString();
    }
    if (typeof score === 'string' && !isNaN(score)) {
      return score;
    }
    return "0";
  };

  // Get score color based on value
  const getScoreColor = (score) => {
    const numericScore = typeof score === 'number' ? score : (parseInt(score) || 0);
    if (isInactive) return 'text-gray-400';
    if (numericScore >= 80) return 'text-green-600 font-bold';
    if (numericScore >= 60) return 'text-blue-600 font-bold';
    if (numericScore >= 40) return 'text-yellow-600 font-bold';
    if (numericScore >= 20) return 'text-orange-600 font-bold';
    return 'text-red-600 font-bold';
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
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {user.role}
        </span>
      </td>
      
      {/* Score Column - Make sure the score is clearly visible */}
      <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
        <div className="flex items-center justify-center">
          <div className={`text-center ${isInactive ? 'opacity-50' : ''}`}>
            <div className={`text-2xl font-bold ${getScoreColor(user.score)}`}>
              {formatScore(user.score)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {user.role === 'admin' ? 'Admin' : 'Points'}
            </div>
            {!isInactive && user.role === 'member' && parseInt(formatScore(user.score)) >= 80 && (
              <div className="flex justify-center mt-1">
                <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>
        </div>
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