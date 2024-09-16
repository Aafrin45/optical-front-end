import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../admin-dashboard/sidebar';
import Avatar from '../assets/Avatar.jpg'


const Profile= () => {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Profile Settings
            </h2>

            <div className="flex justify-center mb-6">
              <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-purple-500">
                <img
                  src={Avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                value=""
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value=""
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500"
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;