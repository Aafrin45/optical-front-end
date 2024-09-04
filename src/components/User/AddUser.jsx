import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formState.email)) {
      setFormState((prevState) => ({
        ...prevState,
        message: 'Invalid email format',
      }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
      });

      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        message: response.data.message || 'User added successfully',
      });
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        message: 'Error adding user',
      }));
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 max-w-sm">
        <h2 className="text-center mb-4 text-gray-800 text-xl">Add User</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-3">
            <label className="block mb-1 text-gray-600 font-light text-left">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md box-border focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-gray-600 font-light text-left">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md box-border focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-gray-600 font-light text-left">Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md box-border focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-gray-600 font-light text-left">Password</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md box-border focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-2/5 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mx-auto"
          >
            Add User
          </button>
        </form>
        {formState.message && <p className="text-center mt-2 text-green-600">{formState.message}</p>}
      </div>
    </div>
  );
};

export default AddUser;
