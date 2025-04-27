import React, { useContext } from "react";

import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";

const Header = () => {
  const {user,ready}=useContext(UserContext)
  return (
    <div className="p-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-md">
      <header className="flex flex-col md:flex-row md:justify-between items-center gap-6">
        {/* Title */}
        <div className="flex justify-center items-center bg-white rounded-full px-6 py-3 shadow-lg">
          <h1 className="flex align-middle items-center text-2xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent tracking-wide">
            URL SHORTENER
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg">
          <Link to="/url-gen-page">Generate URL</Link>
        </div>

        <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg">
          <Link to="/gen-qr-page">Generate QR</Link>
        </div>
        <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg">
          <Link to="/url-analytics">Analytics</Link>
        </div>

        {/* User/Profile */}
        <div className="flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <Link
            to={user?.name ? "/url-gen-page" : "/login"}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full px-3 py-1 shadow-md hover:scale-105 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Profile</span>
          </Link>

          {!!user && (
            <div className="text-gray-700 font-semibold">{user.name}</div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
