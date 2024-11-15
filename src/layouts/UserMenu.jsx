import React, { useState } from "react";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

function UserMenu({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const logOut = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <div className="relative inline-block text-left z-40">
      <div
        className="cursor-pointer hover:text-blue-500 p-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {currentUser.fullName}
      </div>

      {isOpen && (
        <div
          className="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="py-1">
            <li>
              <Link
                to={`/profile/${currentUser.username}`}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Trang cá nhân
              </Link>
            </li>
            <li>
              <button
                onClick={logOut}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
