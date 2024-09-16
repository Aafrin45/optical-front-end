import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/Avatar.jpg';

const Navbar= () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-end items-center">
        <div className="relative">
          <button
            className="flex items-center text-gray-300 hover:text-white focus:outline-none"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <img
              className="h-8 w-8 rounded-full"
              src={Avatar}
              alt="Profile"
            />
          </button>
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <a
                href="#logout"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
