import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LoginBackground from '../assets/login.jpg'; 
import axios from "axios";

const Login= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  
    try {
      const res = await axios.post("http://localhost:3001/api/message", {
        email: email,
        password: password
      });
  
      console.log('Response from server:', res.data);
  
      if (res.data.success) { 
        console.log("Login successful, navigating to dashboard");
        navigate('/admin-dashboard');
      } else {
        console.log('Login failed:', res.data.message);
        alert('Login failed: ' + res.data.message); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.'); 
    }
  };
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBackground})` }} 
    >
      <div
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
        style={{
          border: '1px solid #e2e8f0', 
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.15)', 
        }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
