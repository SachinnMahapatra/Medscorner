import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Details from '../items/details';
import { FaUser, FaBoxOpen, FaSignOutAlt, FaTrash } from 'react-icons/fa';

function RatingModal({ open, onClose, onSubmit, order }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Rate Your Order</h2>
        <div className="flex mb-4">
          {[1,2,3,4,5].map(star => (
            <button
              key={star}
              className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
              onClick={() => setRating(star)}
              type="button"
            >★</button>
          ))}
        </div>
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Write a review (optional)"
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button
            onClick={() => onSubmit(rating, review)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={rating === 0}
          >Submit</button>
        </div>
      </div>
    </div>
  );
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productsById, setProductsById] = useState({});

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config);
          setUserDetails(response.data);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          navigate('/login');
        }
      } catch (error) {
        setLoggedIn(false);
        navigate('/login');
      }
    };
    checkLoggedInUser();
  }, [navigate]);

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
            const response = await axios.get("http://127.0.0.1:8000/api/users/orders/", config);
            const ordersData = response.data;
            // Sort orders by date in descending order (most recent first)
            const sortedOrders = [...ordersData].sort((a, b) => new Date(b.date) - new Date(a.date));
            setOrders(sortedOrders);

            // Collect unique product IDs and fetch details
            const productIds = [...new Set(ordersData.map(order => order.product))];
            const productRequests = productIds.map(id => axios.get(`http://127.0.0.1:8000/api/products/details/${id}`));
            const productResponses = await Promise.all(productRequests);
            const productsMap = {};
            productResponses.forEach(res => {
              if (res.data && res.data.id) {
                productsMap[res.data.id] = res.data;
              }
            });
            setProductsById(productsMap);
          }
        } catch (error) {
          setOrders(null);
          console.error("Error fetching orders or product details:", error);
        }
      }
    };
    getOrders();
  }, [isLoggedIn]);

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
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to logout", error.response?.data || error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/users/details/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error("Failed to delete account", error.response?.data || error.message);
    }
  };

  const handleOpenRating = (order) => {
    setSelectedOrder(order);
    setRatingModalOpen(true);
  };

  const handleSubmitRating = async (rating, review) => {
    const token = localStorage.getItem('accessToken');
    await axios.put(
      `http://127.0.0.1:8000/api/order/rating/${selectedOrder.id}`,
      {
        rating,
        review,
        user: userDetails.id,
        product: selectedOrder.product,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRatingModalOpen(false);
    // Refresh orders list after rating submission
    const response = await axios.get("http://127.0.0.1:8000/api/users/orders/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(response.data);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Details />;
      case 'orders':
        return (
          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
            {orders === null ? (
              <div className="text-center text-gray-500">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center text-gray-500">No orders found</div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {orders.map((order) => {
                  const product = productsById[order.product];
                  return (
                    <div key={order.id} className="bg-white shadow-lg rounded-lg p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          {product?.image && (
                            <img
                              src={`http://127.0.0.1:8000/${product.image}`}
                              alt={product?.name}
                              className="w-16 h-16 object-contain rounded-lg border"
                            />
                          )}
                          <h3 className="font-semibold text-lg">{product?.name || 'Product'}</h3>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-gray-600">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                          <span className={`px-3 py-1 rounded-full text-sm self-start mt-2 ${
                            order.status === 'D' ? 'bg-green-100 text-green-800' :
                            order.status === 'OFD' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status === 'D' ? 'Delivered' :
                             order.status === 'OFD' ? 'Out for Delivery' :
                             'Pending'}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-gray-600">Quantity: {order.quantity}</p>
                          <p className="text-gray-600">Price: ₹{order.price}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Address: {order.address}</p>
                          <p className="text-gray-600">Phone: {order.phone}</p>
                        </div>
                      </div>
                      {order.prescription && (
                        <div className="mt-4">
                          <p className="text-gray-600 mb-2">Prescription:</p>
                          <img 
                            src={`http://127.0.0.1:8000${order.prescription}`} 
                            alt="Prescription" 
                            className="max-w-full md:max-w-xs rounded-lg"
                          />
                        </div>
                      )}
                      {order.status === 'D' && (
                        order.review ? (
                          <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => handleOpenRating(order)}
                          >
                            Edit Review
                          </button>
                        ) : (
                          <button
                            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
                            onClick={() => handleOpenRating(order)}
                          >
                            Rate Order
                          </button>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 'logout':
        return showLogoutConfirm ? (
          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Logout</h2>
            <p className="mb-4">Click the button below to confirm logout.</p>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        );
      case 'delete':
        return showDeleteConfirm ? (
          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Confirm Account Deletion</h2>
            <p className="mb-4">This action is irreversible. Are you sure you want to proceed?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
            <p className="mb-4">Click the button below to confirm account deletion.</p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
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
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="mb-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700 mb-2">
                  {userDetails?.username ? userDetails.username[0].toUpperCase() : 'U'}
                </div>
                <h1 className="text-xl font-semibold text-center">
                  Hello, {userDetails?.username || 'User'}
                </h1>
              </div>
              <ul className="space-y-2 w-full">
                <li
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${
                    activeSection === 'profile' 
                      ? 'bg-blue-100 text-blue-600 font-semibold' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveSection('profile')}
                >
                  <FaUser /> Profile Information
                </li>
                <li
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${
                    activeSection === 'orders' 
                      ? 'bg-blue-100 text-blue-600 font-semibold' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveSection('orders')}
                >
                  <FaBoxOpen /> My Orders
                </li>
                <li
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${
                    activeSection === 'logout' 
                      ? 'bg-blue-100 text-blue-600 font-semibold' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveSection('logout')}
                >
                  <FaSignOutAlt /> Logout
                </li>
                <li
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${
                    activeSection === 'delete' 
                      ? 'bg-blue-100 text-blue-600 font-semibold' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveSection('delete')}
                >
                  <FaTrash /> Delete Account
                </li>
              </ul>
            </div>
            {/* Main content */}
            <div className="w-full lg:w-3/4">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <RatingModal
        open={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        onSubmit={handleSubmitRating}
        order={selectedOrder}
      />
    </>
  );
};

export default ProfilePage;