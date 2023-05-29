import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    setShowDropdown(false);
  };
  
  return (
    isAuthenticated && (
      <div className="relative"> 
        <img 
          src={user.picture} 
          className="h-11 mr-4 rounded-full cursor-pointer transform transition-transform duration-500 hover:scale-105 border-2 border-black"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <div 
            className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
          >
            <a 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
