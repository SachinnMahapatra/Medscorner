import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = (details) => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        };
        await axios.post("http://127.0.0.1:8000/api/users/logout", { "refresh": refreshToken }, config)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setTimeout(() => {
          navigate(-1)
        }, 1000);
        console.log("Log out successful!")
      }
    }
    catch (error) {
      console.error("Failed to logout", error.response?.data || error.message)
    }
  }
  const [activeSection, setActiveSection] = useState('profile');
// console.log(details)
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={details.details.username}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value="Mondal"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  value={details.details.email}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile Number</label>
                <input
                  type="tel"
                  value="+918653804154"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
            <p>You have no recent orders.</p>
          </div>
        );
      case 'logout':
        return (
          <div>
            <h2 onClick={handleLogout()} className="text-2xl font-semibold mb-4">Logout</h2>
            <p>You have successfully logged out.</p>
          </div>
        );
      case 'delete':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 mt-4">
              Delete Account
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
  <>
  <NavBar/>
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-lg font-semibold">Hello, Sourav Mondal</h1>
        </div>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${activeSection === 'profile' ? 'text-blue-500 font-semibold' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            Profile Information
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'orders' ? 'text-blue-500 font-semibold' : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            My Orders
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'logout' ? 'text-blue-500 font-semibold' : ''}`}
            onClick={() => setActiveSection('logout')}
          >
            Logout
          </li>
          <li
            className={`cursor-pointer ${activeSection === 'delete' ? 'text-blue-500 font-semibold' : ''}`}
            onClick={() => setActiveSection('delete')}
          >
            Delete Account
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {renderContent()}
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default ProfilePage;
