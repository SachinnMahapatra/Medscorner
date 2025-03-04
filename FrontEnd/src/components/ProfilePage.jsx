import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Details from '../items/details';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // console.log(token)
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          console.log("logged in")
          const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)
          setLoggedIn(true)
        }
        else {
          setLoggedIn(false);
        }
      }
      catch (error) {
        setLoggedIn(false);
      }
    };
    checkLoggedInUser()
  }, [])

  useEffect(() => {
    const getOrders = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem("accessToken");
          
          if (token) {
            const config = {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            };
            const response = await axios.get("http://127.0.0.1:8000/api/users/orders/", config)
            setOrders(response.data);
            console.log(response.data)

          }
        }
        catch (error) {
          setOrders(null)
        }
      }
    }



    getOrders()

  }, [isLoggedIn])




  // const [userDetails, setUserDetails] = useState({
  //   firstName: details.username || '',
  //   lastName: 'Mondal',
  //   email: details.email || '',
  //   phone: '+918653804154',
  //   address: details.address || '',
  // });






  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        await axios.post(
          "http://127.0.0.1:8000/api/users/logout",
          { refresh: refreshToken },
          config
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.log("Log out successful!");
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to logout", error.response?.data || error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Example API call for account deletion
      await axios.delete("http://127.0.0.1:8000/api/users/delete", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      console.log("Account deleted successfully!");
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error("Failed to delete account", error.response?.data || error.message);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <Details />
        break;

      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="font-semibold">Order #12345</h3>
              <p>Product: { }</p>
              <p>Quantity: 2</p>
              <p>Total Price: $40</p>
              <p>Status: Delivered</p>
            </div>
          </div>
        );
      case 'logout':
        return showLogoutConfirm ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 mt-4 mr-2"
            >
              Yes, Logout
            </button>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 mt-4"
            >
              Cancel
            </button>
          </div>
        )
          :
          (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Logout</h2>
              <p>Click the button below to confirm logout.</p>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 mt-4"
              >
                Logout
              </button>
            </div>
          );
      case 'delete':
        return showDeleteConfirm ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Confirm Account Deletion</h2>
            <p>This action is irreversible. Are you sure you want to proceed?</p>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 mt-4 mr-2"
            >
              Yes, Delete My Account
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 mt-4"
            >
              Cancel
            </button>
          </div>
        )
          :
          (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
              <p>Click the button below to confirm account deletion.</p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 mt-4"
              >
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
      <NavBar />
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
        <div className="w-3/4 p-6">{renderContent()}</div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;

